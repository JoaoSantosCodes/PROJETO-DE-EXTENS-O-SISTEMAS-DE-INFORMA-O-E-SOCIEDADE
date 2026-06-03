-- Script de Criação da Tabela de Usuários no PostgreSQL

-- Criação da tabela 'users' para armazenar o cadastro de alunos extensionistas,
-- parceiros e participantes do letramento digital.
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados de teste (Opcional)
-- OBS: As senhas de teste abaixo devem ser criptografadas no backend via bcrypt.
-- Este script serve como referência para configuração do banco de dados pelo usuário.
