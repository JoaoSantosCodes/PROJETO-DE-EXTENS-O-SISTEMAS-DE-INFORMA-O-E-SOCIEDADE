require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'conecta_inclusao_default_secret_key';

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Fallback in-memory database if PostgreSQL is not connected/configured
let useDb = true;
const mockUsersDb = [];

// Configure PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test connection
pool.connect((err, client, release) => {
    if (err) {
        console.warn('\n============================================================');
        console.warn('⚠️  [POSTGRESQL] ALERTA: Falha ao conectar ao banco de dados!');
        console.warn('Causa:', err.message);
        console.warn('O servidor continuará funcionando no MODO SIMULAÇÃO (em memória).');
        console.warn('Para ativar o Postgres, configure o arquivo .env e crie a tabela.');
        console.warn('============================================================\n');
        useDb = false;
    } else {
        console.log('\n============================================================');
        console.log('✅ [POSTGRESQL] Banco de dados conectado com sucesso!');
        console.log('============================================================\n');
        release();
    }
});

/* ==========================================================================
   AUTHENTICATION ROUTES
   ========================================================================== */

// 1. User Registration Route (POST /api/auth/register)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Validation
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Por favor, insira um e-mail válido.' });
        }

        if (senha.length < 6) {
            return res.status(400).json({ error: 'A senha deve conter no mínimo 6 caracteres.' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        if (useDb) {
            // Check if email already exists in Postgres
            const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (checkUser.rows.length > 0) {
                return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
            }

            // Insert new user into Postgres
            const newUser = await pool.query(
                'INSERT INTO users (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email',
                [nome, email, senhaHash]
            );

            const user = newUser.rows[0];
            const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

            return res.status(201).json({
                message: 'Usuário cadastrado com sucesso!',
                token,
                user: { id: user.id, nome: user.nome, email: user.email }
            });
        } else {
            // Simulation Mode (In-memory)
            const checkUser = mockUsersDb.find(u => u.email === email);
            if (checkUser) {
                return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
            }

            const simulatedUser = {
                id: mockUsersDb.length + 1,
                nome,
                email,
                senha_hash: senhaHash
            };

            mockUsersDb.push(simulatedUser);

            const token = jwt.sign(
                { id: simulatedUser.id, nome: simulatedUser.nome, email: simulatedUser.email }, 
                JWT_SECRET, 
                { expiresIn: '24h' }
            );

            return res.status(201).json({
                message: 'Usuário cadastrado no modo simulação!',
                token,
                user: { id: simulatedUser.id, nome: simulatedUser.nome, email: simulatedUser.email }
            });
        }

    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao cadastrar usuário.' });
    }
});

// 2. User Login Route (POST /api/auth/login)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validation
        if (!email || !senha) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
        }

        let user = null;

        if (useDb) {
            // Find user in Postgres
            const findUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (findUser.rows.length === 0) {
                return res.status(400).json({ error: 'E-mail ou senha incorretos.' });
            }
            user = findUser.rows[0];
        } else {
            // Find user in simulation array
            user = mockUsersDb.find(u => u.email === email);
            if (!user) {
                return res.status(400).json({ error: 'E-mail ou senha incorretos.' });
            }
        }

        // Compare Passwords
        const isMatch = await bcrypt.compare(senha, user.senha_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Issue JWT Token
        const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Login realizado com sucesso!',
            token,
            user: { id: user.id, nome: user.nome, email: user.email }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao realizar login.' });
    }
});

// Catch-all route to serve the SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Servidor ConectaInclusão rodando na porta ${PORT}`);
    if (!useDb) {
        console.log('📌 Rodando em MODO SIMULAÇÃO sem banco PostgreSQL real.');
    }
});
