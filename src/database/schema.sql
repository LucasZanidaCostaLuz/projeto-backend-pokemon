CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE pokemons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    level INT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE OR REPLACE FUNCTION check_pokemon_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM pokemons WHERE user_id = NEW.user_id) >= 6 THEN
        RAISE EXCEPTION 'Cada usuário pode ter no máximo 6 Pokémons.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_pokemon_limit
BEFORE INSERT ON pokemons
FOR EACH ROW
WHEN (NEW.user_id IS NOT NULL)
EXECUTE FUNCTION check_pokemon_limit();

INSERT INTO users (name, email, senha) VALUES 
    ('Alice Silva', 'alice.silva@email.com', '123'),
    ('Bruno Souza', 'bruno.souza@email.com', '456'),
    ('Carla Mendes', 'carla.mendes@email.com', '789');

INSERT INTO pokemons (name, type, level, user_id) VALUES 
    ('Pikachu', 'Elétrico', 25, 1),
    ('Charmander', 'Fogo', 15, 2),
    ('Bulbasaur', 'Planta', 10, NULL);