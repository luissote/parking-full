INSERT IGNORE INTO parqueadero (id, nombre, direccion, telefono, capacidad) VALUES
(1, 'Parqueadero Central', 'Calle 10 # 5-23, Pasto', '3001234567', 20);

INSERT IGNORE INTO usuario (id, nombre, email, password, rol) VALUES
(1, 'Administrador', 'admin@parking.com', 'admin123', 'ADMIN');

INSERT IGNORE INTO tarifa (id, tipo_vehiculo, valor_hora) VALUES
(1, 'CARRO', 2500),
(2, 'MOTO', 1200);

INSERT IGNORE INTO espacio (id, codigo, tipo, estado) VALUES
(1,  'A-01', 'CARRO', 'DISPONIBLE'),
(2,  'A-02', 'CARRO', 'DISPONIBLE'),
(3,  'A-03', 'CARRO', 'OCUPADO'),
(4,  'A-04', 'CARRO', 'DISPONIBLE'),
(5,  'A-05', 'CARRO', 'DISPONIBLE'),
(6,  'A-06', 'CARRO', 'RESERVADO'),
(7,  'A-07', 'CARRO', 'DISPONIBLE'),
(8,  'A-08', 'CARRO', 'OCUPADO'),
(9,  'A-09', 'CARRO', 'DISPONIBLE'),
(10, 'A-10', 'CARRO', 'DISPONIBLE'),
(11, 'B-01', 'CARRO', 'DISPONIBLE'),
(12, 'B-02', 'CARRO', 'DISPONIBLE'),
(13, 'B-03', 'CARRO', 'OCUPADO'),
(14, 'B-04', 'CARRO', 'DISPONIBLE'),
(15, 'B-05', 'CARRO', 'DISPONIBLE'),
(16, 'M-01', 'MOTO', 'DISPONIBLE'),
(17, 'M-02', 'MOTO', 'OCUPADO'),
(18, 'M-03', 'MOTO', 'DISPONIBLE'),
(19, 'M-04', 'MOTO', 'DISPONIBLE'),
(20, 'M-05', 'MOTO', 'RESERVADO');
