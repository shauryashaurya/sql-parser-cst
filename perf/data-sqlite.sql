/*******************************************************************************
   Chinook Database - Version 1.4
   Script: Chinook_Sqlite.sql
   Description: Creates and populates the Chinook database.
   DB Server: Sqlite
   Author: Luis Rocha
   License: http://www.codeplex.com/ChinookDatabase/license
********************************************************************************/

/*******************************************************************************
   Create Tables
********************************************************************************/
CREATE TABLE [Album]
(
    [AlbumId] INTEGER  NOT NULL,
    [Title] NVARCHAR(160)  NOT NULL,
    [ArtistId] INTEGER  NOT NULL,
    CONSTRAINT [PK_Album] PRIMARY KEY  ([AlbumId])
);

CREATE TABLE [Artist]
(
    [ArtistId] INTEGER  NOT NULL,
    [Name] NVARCHAR(120),
    CONSTRAINT [PK_Artist] PRIMARY KEY  ([ArtistId])
);

CREATE TABLE [Customer]
(
    [CustomerId] INTEGER  NOT NULL,
    [FirstName] NVARCHAR(40)  NOT NULL,
    [LastName] NVARCHAR(20)  NOT NULL,
    [Company] NVARCHAR(80),
    [Address] NVARCHAR(70),
    [City] NVARCHAR(40),
    [State] NVARCHAR(40),
    [Country] NVARCHAR(40),
    [PostalCode] NVARCHAR(10),
    [Phone] NVARCHAR(24),
    [Fax] NVARCHAR(24),
    [Email] NVARCHAR(60)  NOT NULL,
    [SupportRepId] INTEGER,
    CONSTRAINT [PK_Customer] PRIMARY KEY  ([CustomerId])
);

CREATE TABLE [Employee]
(
    [EmployeeId] INTEGER  NOT NULL,
    [LastName] NVARCHAR(20)  NOT NULL,
    [FirstName] NVARCHAR(20)  NOT NULL,
    [Title] NVARCHAR(30),
    [ReportsTo] INTEGER,
    [BirthDate] DATETIME,
    [HireDate] DATETIME,
    [Address] NVARCHAR(70),
    [City] NVARCHAR(40),
    [State] NVARCHAR(40),
    [Country] NVARCHAR(40),
    [PostalCode] NVARCHAR(10),
    [Phone] NVARCHAR(24),
    [Fax] NVARCHAR(24),
    [Email] NVARCHAR(60),
    CONSTRAINT [PK_Employee] PRIMARY KEY  ([EmployeeId])
);

CREATE TABLE [Genre]
(
    [GenreId] INTEGER  NOT NULL,
    [Name] NVARCHAR(120),
    CONSTRAINT [PK_Genre] PRIMARY KEY  ([GenreId])
);

CREATE TABLE [Invoice]
(
    [InvoiceId] INTEGER  NOT NULL,
    [CustomerId] INTEGER  NOT NULL,
    [InvoiceDate] DATETIME  NOT NULL,
    [BillingAddress] NVARCHAR(70),
    [BillingCity] NVARCHAR(40),
    [BillingState] NVARCHAR(40),
    [BillingCountry] NVARCHAR(40),
    [BillingPostalCode] NVARCHAR(10),
    [Total] NUMERIC(10,2)  NOT NULL,
    CONSTRAINT [PK_Invoice] PRIMARY KEY  ([InvoiceId])
);

CREATE TABLE [InvoiceLine]
(
    [InvoiceLineId] INTEGER  NOT NULL,
    [InvoiceId] INTEGER  NOT NULL,
    [TrackId] INTEGER  NOT NULL,
    [UnitPrice] NUMERIC(10,2)  NOT NULL,
    [Quantity] INTEGER  NOT NULL,
    CONSTRAINT [PK_InvoiceLine] PRIMARY KEY  ([InvoiceLineId])
);

CREATE TABLE [MediaType]
(
    [MediaTypeId] INTEGER  NOT NULL,
    [Name] NVARCHAR(120),
    CONSTRAINT [PK_MediaType] PRIMARY KEY  ([MediaTypeId])
);

CREATE TABLE [Playlist]
(
    [PlaylistId] INTEGER  NOT NULL,
    [Name] NVARCHAR(120),
    CONSTRAINT [PK_Playlist] PRIMARY KEY  ([PlaylistId])
);

CREATE TABLE [PlaylistTrack]
(
    [PlaylistId] INTEGER  NOT NULL,
    [TrackId] INTEGER  NOT NULL,
    CONSTRAINT [PK_PlaylistTrack] PRIMARY KEY  ([PlaylistId], [TrackId])
);

CREATE TABLE [Track]
(
    [TrackId] INTEGER  NOT NULL,
    [Name] NVARCHAR(200)  NOT NULL,
    [AlbumId] INTEGER,
    [MediaTypeId] INTEGER  NOT NULL,
    [GenreId] INTEGER,
    [Composer] NVARCHAR(220),
    [Milliseconds] INTEGER  NOT NULL,
    [Bytes] INTEGER,
    [UnitPrice] NUMERIC(10,2)  NOT NULL,
    CONSTRAINT [PK_Track] PRIMARY KEY  ([TrackId])
);



/*******************************************************************************
   Create Primary Key Unique Indexes
********************************************************************************/

/*******************************************************************************
   Create Foreign Keys
********************************************************************************/
CREATE INDEX [IFK_AlbumArtistId] ON [Album] ([ArtistId]);

CREATE INDEX [IFK_CustomerSupportRepId] ON [Customer] ([SupportRepId]);

CREATE INDEX [IFK_EmployeeReportsTo] ON [Employee] ([ReportsTo]);

CREATE INDEX [IFK_InvoiceCustomerId] ON [Invoice] ([CustomerId]);

CREATE INDEX [IFK_InvoiceLineInvoiceId] ON [InvoiceLine] ([InvoiceId]);

CREATE INDEX [IFK_InvoiceLineTrackId] ON [InvoiceLine] ([TrackId]);

CREATE INDEX [IFK_PlaylistTrackTrackId] ON [PlaylistTrack] ([TrackId]);

CREATE INDEX [IFK_TrackAlbumId] ON [Track] ([AlbumId]);

CREATE INDEX [IFK_TrackGenreId] ON [Track] ([GenreId]);

CREATE INDEX [IFK_TrackMediaTypeId] ON [Track] ([MediaTypeId]);


/*******************************************************************************
   Populate Tables
********************************************************************************/
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (1, 'Rock');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (2, 'Jazz');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (3, 'Metal');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (4, 'Alternative & Punk');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (5, 'Rock And Roll');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (6, 'Blues');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (7, 'Latin');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (8, 'Reggae');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (9, 'Pop');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (10, 'Soundtrack');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (11, 'Bossa Nova');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (12, 'Easy Listening');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (13, 'Heavy Metal');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (14, 'R&B/Soul');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (15, 'Electronica/Dance');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (16, 'World');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (17, 'Hip Hop/Rap');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (18, 'Science Fiction');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (19, 'TV Shows');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (20, 'Sci Fi & Fantasy');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (21, 'Drama');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (22, 'Comedy');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (23, 'Alternative');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (24, 'Classical');
INSERT INTO [Genre] ([GenreId], [Name]) VALUES (25, 'Opera');

INSERT INTO [MediaType] ([MediaTypeId], [Name]) VALUES (1, 'MPEG audio file');
INSERT INTO [MediaType] ([MediaTypeId], [Name]) VALUES (2, 'Protected AAC audio file');
INSERT INTO [MediaType] ([MediaTypeId], [Name]) VALUES (3, 'Protected MPEG-4 video file');
INSERT INTO [MediaType] ([MediaTypeId], [Name]) VALUES (4, 'Purchased AAC audio file');
INSERT INTO [MediaType] ([MediaTypeId], [Name]) VALUES (5, 'AAC audio file');

INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (1, 'AC/DC');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (2, 'Accept');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (3, 'Aerosmith');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (4, 'Alanis Morissette');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (5, 'Alice In Chains');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (6, 'Antônio Carlos Jobim');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (7, 'Apocalyptica');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (8, 'Audioslave');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (9, 'BackBeat');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (10, 'Billy Cobham');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (11, 'Black Label Society');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (12, 'Black Sabbath');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (13, 'Body Count');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (14, 'Bruce Dickinson');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (15, 'Buddy Guy');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (16, 'Caetano Veloso');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (17, 'Chico Buarque');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (18, 'Chico Science & Nação Zumbi');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (19, 'Cidade Negra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (20, 'Cláudio Zoli');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (21, 'Various Artists');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (22, 'Led Zeppelin');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (23, 'Frank Zappa & Captain Beefheart');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (24, 'Marcos Valle');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (25, 'Milton Nascimento & Bebeto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (26, 'Azymuth');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (27, 'Gilberto Gil');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (28, 'João Gilberto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (29, 'Bebel Gilberto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (30, 'Jorge Vercilo');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (31, 'Baby Consuelo');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (32, 'Ney Matogrosso');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (33, 'Luiz Melodia');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (34, 'Nando Reis');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (35, 'Pedro Luís & A Parede');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (36, 'O Rappa');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (37, 'Ed Motta');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (38, 'Banda Black Rio');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (39, 'Fernanda Porto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (40, 'Os Cariocas');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (41, 'Elis Regina');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (42, 'Milton Nascimento');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (43, 'A Cor Do Som');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (44, 'Kid Abelha');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (45, 'Sandra De Sá');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (46, 'Jorge Ben');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (47, 'Hermeto Pascoal');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (48, 'Barão Vermelho');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (49, 'Edson, DJ Marky & DJ Patife Featuring Fernanda Porto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (50, 'Metallica');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (51, 'Queen');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (52, 'Kiss');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (53, 'Spyro Gyra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (54, 'Green Day');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (55, 'David Coverdale');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (56, 'Gonzaguinha');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (57, 'Os Mutantes');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (58, 'Deep Purple');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (59, 'Santana');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (60, 'Santana Feat. Dave Matthews');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (61, 'Santana Feat. Everlast');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (62, 'Santana Feat. Rob Thomas');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (63, 'Santana Feat. Lauryn Hill & Cee-Lo');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (64, 'Santana Feat. The Project G&B');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (65, 'Santana Feat. Maná');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (66, 'Santana Feat. Eagle-Eye Cherry');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (67, 'Santana Feat. Eric Clapton');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (68, 'Miles Davis');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (69, 'Gene Krupa');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (70, 'Toquinho & Vinícius');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (71, 'Vinícius De Moraes & Baden Powell');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (72, 'Vinícius De Moraes');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (73, 'Vinícius E Qurteto Em Cy');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (74, 'Vinícius E Odette Lara');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (75, 'Vinicius, Toquinho & Quarteto Em Cy');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (76, 'Creedence Clearwater Revival');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (77, 'Cássia Eller');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (78, 'Def Leppard');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (79, 'Dennis Chambers');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (80, 'Djavan');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (81, 'Eric Clapton');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (82, 'Faith No More');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (83, 'Falamansa');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (84, 'Foo Fighters');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (85, 'Frank Sinatra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (86, 'Funk Como Le Gusta');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (87, 'Godsmack');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (88, 'Guns N'' Roses');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (89, 'Incognito');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (90, 'Iron Maiden');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (91, 'James Brown');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (92, 'Jamiroquai');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (93, 'JET');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (94, 'Jimi Hendrix');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (95, 'Joe Satriani');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (96, 'Jota Quest');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (97, 'João Suplicy');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (98, 'Judas Priest');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (99, 'Legião Urbana');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (100, 'Lenny Kravitz');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (101, 'Lulu Santos');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (102, 'Marillion');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (103, 'Marisa Monte');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (104, 'Marvin Gaye');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (105, 'Men At Work');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (106, 'Motörhead');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (107, 'Motörhead & Girlschool');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (108, 'Mônica Marianno');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (109, 'Mötley Crüe');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (110, 'Nirvana');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (111, 'O Terço');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (112, 'Olodum');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (113, 'Os Paralamas Do Sucesso');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (114, 'Ozzy Osbourne');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (115, 'Page & Plant');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (116, 'Passengers');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (117, 'Paul D''Ianno');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (118, 'Pearl Jam');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (119, 'Peter Tosh');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (120, 'Pink Floyd');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (121, 'Planet Hemp');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (122, 'R.E.M. Feat. Kate Pearson');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (123, 'R.E.M. Feat. KRS-One');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (124, 'R.E.M.');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (125, 'Raimundos');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (126, 'Raul Seixas');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (127, 'Red Hot Chili Peppers');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (128, 'Rush');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (129, 'Simply Red');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (130, 'Skank');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (131, 'Smashing Pumpkins');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (132, 'Soundgarden');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (133, 'Stevie Ray Vaughan & Double Trouble');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (134, 'Stone Temple Pilots');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (135, 'System Of A Down');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (136, 'Terry Bozzio, Tony Levin & Steve Stevens');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (137, 'The Black Crowes');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (138, 'The Clash');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (139, 'The Cult');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (140, 'The Doors');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (141, 'The Police');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (142, 'The Rolling Stones');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (143, 'The Tea Party');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (144, 'The Who');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (145, 'Tim Maia');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (146, 'Titãs');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (147, 'Battlestar Galactica');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (148, 'Heroes');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (149, 'Lost');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (150, 'U2');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (151, 'UB40');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (152, 'Van Halen');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (153, 'Velvet Revolver');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (154, 'Whitesnake');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (155, 'Zeca Pagodinho');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (156, 'The Office');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (157, 'Dread Zeppelin');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (158, 'Battlestar Galactica (Classic)');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (159, 'Aquaman');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (160, 'Christina Aguilera featuring BigElf');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (161, 'Aerosmith & Sierra Leone''s Refugee Allstars');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (162, 'Los Lonely Boys');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (163, 'Corinne Bailey Rae');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (164, 'Dhani Harrison & Jakob Dylan');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (165, 'Jackson Browne');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (166, 'Avril Lavigne');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (167, 'Big & Rich');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (168, 'Youssou N''Dour');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (169, 'Black Eyed Peas');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (170, 'Jack Johnson');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (171, 'Ben Harper');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (172, 'Snow Patrol');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (173, 'Matisyahu');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (174, 'The Postal Service');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (175, 'Jaguares');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (176, 'The Flaming Lips');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (177, 'Jack''s Mannequin & Mick Fleetwood');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (178, 'Regina Spektor');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (179, 'Scorpions');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (180, 'House Of Pain');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (181, 'Xis');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (182, 'Nega Gizza');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (183, 'Gustavo & Andres Veiga & Salazar');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (184, 'Rodox');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (185, 'Charlie Brown Jr.');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (186, 'Pedro Luís E A Parede');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (187, 'Los Hermanos');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (188, 'Mundo Livre S/A');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (189, 'Otto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (190, 'Instituto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (191, 'Nação Zumbi');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (192, 'DJ Dolores & Orchestra Santa Massa');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (193, 'Seu Jorge');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (194, 'Sabotage E Instituto');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (195, 'Stereo Maracana');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (196, 'Cake');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (197, 'Aisha Duo');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (198, 'Habib Koité and Bamada');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (199, 'Karsh Kale');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (200, 'The Posies');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (201, 'Luciana Souza/Romero Lubambo');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (202, 'Aaron Goldberg');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (203, 'Nicolaus Esterhazy Sinfonia');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (204, 'Temple of the Dog');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (205, 'Chris Cornell');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (206, 'Alberto Turco & Nova Schola Gregoriana');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (207, 'Richard Marlow & The Choir of Trinity College, Cambridge');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (208, 'English Concert & Trevor Pinnock');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (209, 'Anne-Sophie Mutter, Herbert Von Karajan & Wiener Philharmoniker');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (210, 'Hilary Hahn, Jeffrey Kahane, Los Angeles Chamber Orchestra & Margaret Batjer');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (211, 'Wilhelm Kempff');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (212, 'Yo-Yo Ma');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (213, 'Scholars Baroque Ensemble');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (214, 'Academy of St. Martin in the Fields & Sir Neville Marriner');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (215, 'Academy of St. Martin in the Fields Chamber Ensemble & Sir Neville Marriner');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (216, 'Berliner Philharmoniker, Claudio Abbado & Sabine Meyer');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (217, 'Royal Philharmonic Orchestra & Sir Thomas Beecham');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (218, 'Orchestre Révolutionnaire et Romantique & John Eliot Gardiner');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (219, 'Britten Sinfonia, Ivor Bolton & Lesley Garrett');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (220, 'Chicago Symphony Chorus, Chicago Symphony Orchestra & Sir Georg Solti');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (221, 'Sir Georg Solti & Wiener Philharmoniker');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (222, 'Academy of St. Martin in the Fields, John Birch, Sir Neville Marriner & Sylvia McNair');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (223, 'London Symphony Orchestra & Sir Charles Mackerras');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (224, 'Barry Wordsworth & BBC Concert Orchestra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (225, 'Herbert Von Karajan, Mirella Freni & Wiener Philharmoniker');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (226, 'Eugene Ormandy');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (227, 'Luciano Pavarotti');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (228, 'Leonard Bernstein & New York Philharmonic');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (229, 'Boston Symphony Orchestra & Seiji Ozawa');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (230, 'Aaron Copland & London Symphony Orchestra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (231, 'Ton Koopman');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (232, 'Sergei Prokofiev & Yuri Temirkanov');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (233, 'Chicago Symphony Orchestra & Fritz Reiner');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (234, 'Orchestra of The Age of Enlightenment');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (235, 'Emanuel Ax, Eugene Ormandy & Philadelphia Orchestra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (236, 'James Levine');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (237, 'Berliner Philharmoniker & Hans Rosbaud');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (238, 'Maurizio Pollini');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (239, 'Academy of St. Martin in the Fields, Sir Neville Marriner & William Bennett');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (240, 'Gustav Mahler');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (241, 'Felix Schmidt, London Symphony Orchestra & Rafael Frühbeck de Burgos');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (242, 'Edo de Waart & San Francisco Symphony');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (243, 'Antal Doráti & London Symphony Orchestra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (244, 'Choir Of Westminster Abbey & Simon Preston');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (245, 'Michael Tilson Thomas & San Francisco Symphony');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (246, 'Chor der Wiener Staatsoper, Herbert Von Karajan & Wiener Philharmoniker');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (247, 'The King''s Singers');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (248, 'Berliner Philharmoniker & Herbert Von Karajan');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (249, 'Sir Georg Solti, Sumi Jo & Wiener Philharmoniker');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (250, 'Christopher O''Riley');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (251, 'Fretwork');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (252, 'Amy Winehouse');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (253, 'Calexico');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (254, 'Otto Klemperer & Philharmonia Orchestra');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (255, 'Yehudi Menuhin');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (256, 'Philharmonia Orchestra & Sir Neville Marriner');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (257, 'Academy of St. Martin in the Fields, Sir Neville Marriner & Thurston Dart');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (258, 'Les Arts Florissants & William Christie');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (259, 'The 12 Cellists of The Berlin Philharmonic');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (260, 'Adrian Leaper & Doreen de Feis');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (261, 'Roger Norrington, London Classical Players');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (262, 'Charles Dutoit & L''Orchestre Symphonique de Montréal');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (263, 'Equale Brass Ensemble, John Eliot Gardiner & Munich Monteverdi Orchestra and Choir');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (264, 'Kent Nagano and Orchestre de l''Opéra de Lyon');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (265, 'Julian Bream');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (266, 'Martin Roscoe');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (267, 'Göteborgs Symfoniker & Neeme Järvi');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (268, 'Itzhak Perlman');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (269, 'Michele Campanella');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (270, 'Gerald Moore');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (271, 'Mela Tenenbaum, Pro Musica Prague & Richard Kapp');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (272, 'Emerson String Quartet');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (273, 'C. Monteverdi, Nigel Rogers - Chiaroscuro; London Baroque; London Cornett & Sackbu');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (274, 'Nash Ensemble');
INSERT INTO [Artist] ([ArtistId], [Name]) VALUES (275, 'Philip Glass Ensemble');

INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (1, 'For Those About To Rock We Salute You', 1);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (2, 'Balls to the Wall', 2);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (3, 'Restless and Wild', 2);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (4, 'Let There Be Rock', 1);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (5, 'Big Ones', 3);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (6, 'Jagged Little Pill', 4);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (7, 'Facelift', 5);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (8, 'Warner 25 Anos', 6);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (9, 'Plays Metallica By Four Cellos', 7);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (10, 'Audioslave', 8);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (11, 'Out Of Exile', 8);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (12, 'BackBeat Soundtrack', 9);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (13, 'The Best Of Billy Cobham', 10);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (14, 'Alcohol Fueled Brewtality Live! [Disc 1]', 11);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (15, 'Alcohol Fueled Brewtality Live! [Disc 2]', 11);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (16, 'Black Sabbath', 12);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (17, 'Black Sabbath Vol. 4 (Remaster)', 12);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (18, 'Body Count', 13);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (19, 'Chemical Wedding', 14);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (20, 'The Best Of Buddy Guy - The Millenium Collection', 15);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (21, 'Prenda Minha', 16);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (22, 'Sozinho Remix Ao Vivo', 16);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (23, 'Minha Historia', 17);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (24, 'Afrociberdelia', 18);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (25, 'Da Lama Ao Caos', 18);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (26, 'Acústico MTV [Live]', 19);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (27, 'Cidade Negra - Hits', 19);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (28, 'Na Pista', 20);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (29, 'Axé Bahia 2001', 21);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (30, 'BBC Sessions [Disc 1] [Live]', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (31, 'Bongo Fury', 23);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (32, 'Carnaval 2001', 21);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (33, 'Chill: Brazil (Disc 1)', 24);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (34, 'Chill: Brazil (Disc 2)', 6);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (35, 'Garage Inc. (Disc 1)', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (36, 'Greatest Hits II', 51);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (37, 'Greatest Kiss', 52);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (38, 'Heart of the Night', 53);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (39, 'International Superhits', 54);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (40, 'Into The Light', 55);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (41, 'Meus Momentos', 56);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (42, 'Minha História', 57);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (43, 'MK III The Final Concerts [Disc 1]', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (44, 'Physical Graffiti [Disc 1]', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (45, 'Sambas De Enredo 2001', 21);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (46, 'Supernatural', 59);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (47, 'The Best of Ed Motta', 37);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (48, 'The Essential Miles Davis [Disc 1]', 68);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (49, 'The Essential Miles Davis [Disc 2]', 68);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (50, 'The Final Concerts (Disc 2)', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (51, 'Up An'' Atom', 69);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (52, 'Vinícius De Moraes - Sem Limite', 70);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (53, 'Vozes do MPB', 21);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (54, 'Chronicle, Vol. 1', 76);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (55, 'Chronicle, Vol. 2', 76);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (56, 'Cássia Eller - Coleção Sem Limite [Disc 2]', 77);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (57, 'Cássia Eller - Sem Limite [Disc 1]', 77);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (58, 'Come Taste The Band', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (59, 'Deep Purple In Rock', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (60, 'Fireball', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (61, 'Knocking at Your Back Door: The Best Of Deep Purple in the 80''s', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (62, 'Machine Head', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (63, 'Purpendicular', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (64, 'Slaves And Masters', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (65, 'Stormbringer', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (66, 'The Battle Rages On', 58);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (67, 'Vault: Def Leppard''s Greatest Hits', 78);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (68, 'Outbreak', 79);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (69, 'Djavan Ao Vivo - Vol. 02', 80);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (70, 'Djavan Ao Vivo - Vol. 1', 80);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (71, 'Elis Regina-Minha História', 41);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (72, 'The Cream Of Clapton', 81);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (73, 'Unplugged', 81);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (74, 'Album Of The Year', 82);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (75, 'Angel Dust', 82);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (76, 'King For A Day Fool For A Lifetime', 82);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (77, 'The Real Thing', 82);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (78, 'Deixa Entrar', 83);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (79, 'In Your Honor [Disc 1]', 84);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (80, 'In Your Honor [Disc 2]', 84);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (81, 'One By One', 84);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (82, 'The Colour And The Shape', 84);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (83, 'My Way: The Best Of Frank Sinatra [Disc 1]', 85);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (84, 'Roda De Funk', 86);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (85, 'As Canções de Eu Tu Eles', 27);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (86, 'Quanta Gente Veio Ver (Live)', 27);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (87, 'Quanta Gente Veio ver--Bônus De Carnaval', 27);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (88, 'Faceless', 87);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (89, 'American Idiot', 54);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (90, 'Appetite for Destruction', 88);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (91, 'Use Your Illusion I', 88);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (92, 'Use Your Illusion II', 88);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (93, 'Blue Moods', 89);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (94, 'A Matter of Life and Death', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (95, 'A Real Dead One', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (96, 'A Real Live One', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (97, 'Brave New World', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (98, 'Dance Of Death', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (99, 'Fear Of The Dark', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (100, 'Iron Maiden', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (101, 'Killers', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (102, 'Live After Death', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (103, 'Live At Donington 1992 (Disc 1)', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (104, 'Live At Donington 1992 (Disc 2)', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (105, 'No Prayer For The Dying', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (106, 'Piece Of Mind', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (107, 'Powerslave', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (108, 'Rock In Rio [CD1]', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (109, 'Rock In Rio [CD2]', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (110, 'Seventh Son of a Seventh Son', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (111, 'Somewhere in Time', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (112, 'The Number of The Beast', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (113, 'The X Factor', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (114, 'Virtual XI', 90);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (115, 'Sex Machine', 91);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (116, 'Emergency On Planet Earth', 92);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (117, 'Synkronized', 92);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (118, 'The Return Of The Space Cowboy', 92);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (119, 'Get Born', 93);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (120, 'Are You Experienced?', 94);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (121, 'Surfing with the Alien (Remastered)', 95);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (122, 'Jorge Ben Jor 25 Anos', 46);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (123, 'Jota Quest-1995', 96);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (124, 'Cafezinho', 97);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (125, 'Living After Midnight', 98);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (126, 'Unplugged [Live]', 52);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (127, 'BBC Sessions [Disc 2] [Live]', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (128, 'Coda', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (129, 'Houses Of The Holy', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (130, 'In Through The Out Door', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (131, 'IV', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (132, 'Led Zeppelin I', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (133, 'Led Zeppelin II', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (134, 'Led Zeppelin III', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (135, 'Physical Graffiti [Disc 2]', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (136, 'Presence', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (137, 'The Song Remains The Same (Disc 1)', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (138, 'The Song Remains The Same (Disc 2)', 22);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (139, 'A TempestadeTempestade Ou O Livro Dos Dias', 99);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (140, 'Mais Do Mesmo', 99);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (141, 'Greatest Hits', 100);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (142, 'Lulu Santos - RCA 100 Anos De Música - Álbum 01', 101);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (143, 'Lulu Santos - RCA 100 Anos De Música - Álbum 02', 101);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (144, 'Misplaced Childhood', 102);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (145, 'Barulhinho Bom', 103);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (146, 'Seek And Shall Find: More Of The Best (1963-1981)', 104);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (147, 'The Best Of Men At Work', 105);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (148, 'Black Album', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (149, 'Garage Inc. (Disc 2)', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (150, 'Kill ''Em All', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (151, 'Load', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (152, 'Master Of Puppets', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (153, 'ReLoad', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (154, 'Ride The Lightning', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (155, 'St. Anger', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (156, '...And Justice For All', 50);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (157, 'Miles Ahead', 68);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (158, 'Milton Nascimento Ao Vivo', 42);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (159, 'Minas', 42);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (160, 'Ace Of Spades', 106);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (161, 'Demorou...', 108);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (162, 'Motley Crue Greatest Hits', 109);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (163, 'From The Muddy Banks Of The Wishkah [Live]', 110);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (164, 'Nevermind', 110);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (165, 'Compositores', 111);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (166, 'Olodum', 112);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (167, 'Acústico MTV', 113);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (168, 'Arquivo II', 113);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (169, 'Arquivo Os Paralamas Do Sucesso', 113);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (170, 'Bark at the Moon (Remastered)', 114);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (171, 'Blizzard of Ozz', 114);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (172, 'Diary of a Madman (Remastered)', 114);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (173, 'No More Tears (Remastered)', 114);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (174, 'Tribute', 114);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (175, 'Walking Into Clarksdale', 115);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (176, 'Original Soundtracks 1', 116);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (177, 'The Beast Live', 117);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (178, 'Live On Two Legs [Live]', 118);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (179, 'Pearl Jam', 118);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (180, 'Riot Act', 118);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (181, 'Ten', 118);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (182, 'Vs.', 118);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (183, 'Dark Side Of The Moon', 120);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (184, 'Os Cães Ladram Mas A Caravana Não Pára', 121);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (185, 'Greatest Hits I', 51);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (186, 'News Of The World', 51);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (187, 'Out Of Time', 122);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (188, 'Green', 124);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (189, 'New Adventures In Hi-Fi', 124);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (190, 'The Best Of R.E.M.: The IRS Years', 124);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (191, 'Cesta Básica', 125);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (192, 'Raul Seixas', 126);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (193, 'Blood Sugar Sex Magik', 127);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (194, 'By The Way', 127);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (195, 'Californication', 127);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (196, 'Retrospective I (1974-1980)', 128);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (197, 'Santana - As Years Go By', 59);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (198, 'Santana Live', 59);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (199, 'Maquinarama', 130);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (200, 'O Samba Poconé', 130);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (201, 'Judas 0: B-Sides and Rarities', 131);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (202, 'Rotten Apples: Greatest Hits', 131);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (203, 'A-Sides', 132);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (204, 'Morning Dance', 53);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (205, 'In Step', 133);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (206, 'Core', 134);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (207, 'Mezmerize', 135);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (208, '[1997] Black Light Syndrome', 136);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (209, 'Live [Disc 1]', 137);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (210, 'Live [Disc 2]', 137);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (211, 'The Singles', 138);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (212, 'Beyond Good And Evil', 139);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (213, 'Pure Cult: The Best Of The Cult (For Rockers, Ravers, Lovers & Sinners) [UK]', 139);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (214, 'The Doors', 140);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (215, 'The Police Greatest Hits', 141);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (216, 'Hot Rocks, 1964-1971 (Disc 1)', 142);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (217, 'No Security', 142);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (218, 'Voodoo Lounge', 142);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (219, 'Tangents', 143);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (220, 'Transmission', 143);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (221, 'My Generation - The Very Best Of The Who', 144);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (222, 'Serie Sem Limite (Disc 1)', 145);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (223, 'Serie Sem Limite (Disc 2)', 145);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (224, 'Acústico', 146);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (225, 'Volume Dois', 146);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (226, 'Battlestar Galactica: The Story So Far', 147);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (227, 'Battlestar Galactica, Season 3', 147);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (228, 'Heroes, Season 1', 148);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (229, 'Lost, Season 3', 149);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (230, 'Lost, Season 1', 149);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (231, 'Lost, Season 2', 149);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (232, 'Achtung Baby', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (233, 'All That You Can''t Leave Behind', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (234, 'B-Sides 1980-1990', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (235, 'How To Dismantle An Atomic Bomb', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (236, 'Pop', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (237, 'Rattle And Hum', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (238, 'The Best Of 1980-1990', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (239, 'War', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (240, 'Zooropa', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (241, 'UB40 The Best Of - Volume Two [UK]', 151);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (242, 'Diver Down', 152);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (243, 'The Best Of Van Halen, Vol. I', 152);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (244, 'Van Halen', 152);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (245, 'Van Halen III', 152);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (246, 'Contraband', 153);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (247, 'Vinicius De Moraes', 72);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (248, 'Ao Vivo [IMPORT]', 155);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (249, 'The Office, Season 1', 156);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (250, 'The Office, Season 2', 156);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (251, 'The Office, Season 3', 156);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (252, 'Un-Led-Ed', 157);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (253, 'Battlestar Galactica (Classic), Season 1', 158);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (254, 'Aquaman', 159);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (255, 'Instant Karma: The Amnesty International Campaign to Save Darfur', 150);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (256, 'Speak of the Devil', 114);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (257, '20th Century Masters - The Millennium Collection: The Best of Scorpions', 179);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (258, 'House of Pain', 180);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (259, 'Radio Brasil (O Som da Jovem Vanguarda) - Seleccao de Henrique Amaro', 36);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (260, 'Cake: B-Sides and Rarities', 196);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (261, 'LOST, Season 4', 149);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (262, 'Quiet Songs', 197);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (263, 'Muso Ko', 198);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (264, 'Realize', 199);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (265, 'Every Kind of Light', 200);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (266, 'Duos II', 201);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (267, 'Worlds', 202);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (268, 'The Best of Beethoven', 203);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (269, 'Temple of the Dog', 204);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (270, 'Carry On', 205);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (271, 'Revelations', 8);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (272, 'Adorate Deum: Gregorian Chant from the Proper of the Mass', 206);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (273, 'Allegri: Miserere', 207);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (274, 'Pachelbel: Canon & Gigue', 208);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (275, 'Vivaldi: The Four Seasons', 209);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (276, 'Bach: Violin Concertos', 210);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (277, 'Bach: Goldberg Variations', 211);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (278, 'Bach: The Cello Suites', 212);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (279, 'Handel: The Messiah (Highlights)', 213);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (280, 'The World of Classical Favourites', 214);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (281, 'Sir Neville Marriner: A Celebration', 215);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (282, 'Mozart: Wind Concertos', 216);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (283, 'Haydn: Symphonies 99 - 104', 217);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (284, 'Beethoven: Symhonies Nos. 5 & 6', 218);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (285, 'A Soprano Inspired', 219);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (286, 'Great Opera Choruses', 220);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (287, 'Wagner: Favourite Overtures', 221);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (288, 'Fauré: Requiem, Ravel: Pavane & Others', 222);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (289, 'Tchaikovsky: The Nutcracker', 223);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (290, 'The Last Night of the Proms', 224);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (291, 'Puccini: Madama Butterfly - Highlights', 225);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (292, 'Holst: The Planets, Op. 32 & Vaughan Williams: Fantasies', 226);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (293, 'Pavarotti''s Opera Made Easy', 227);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (294, 'Great Performances - Barber''s Adagio and Other Romantic Favorites for Strings', 228);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (295, 'Carmina Burana', 229);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (296, 'A Copland Celebration, Vol. I', 230);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (297, 'Bach: Toccata & Fugue in D Minor', 231);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (298, 'Prokofiev: Symphony No.1', 232);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (299, 'Scheherazade', 233);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (300, 'Bach: The Brandenburg Concertos', 234);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (301, 'Chopin: Piano Concertos Nos. 1 & 2', 235);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (302, 'Mascagni: Cavalleria Rusticana', 236);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (303, 'Sibelius: Finlandia', 237);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (304, 'Beethoven Piano Sonatas: Moonlight & Pastorale', 238);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (305, 'Great Recordings of the Century - Mahler: Das Lied von der Erde', 240);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (306, 'Elgar: Cello Concerto & Vaughan Williams: Fantasias', 241);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (307, 'Adams, John: The Chairman Dances', 242);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (308, 'Tchaikovsky: 1812 Festival Overture, Op.49, Capriccio Italien & Beethoven: Wellington''s Victory', 243);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (309, 'Palestrina: Missa Papae Marcelli & Allegri: Miserere', 244);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (310, 'Prokofiev: Romeo & Juliet', 245);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (311, 'Strauss: Waltzes', 226);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (312, 'Berlioz: Symphonie Fantastique', 245);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (313, 'Bizet: Carmen Highlights', 246);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (314, 'English Renaissance', 247);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (315, 'Handel: Music for the Royal Fireworks (Original Version 1749)', 208);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (316, 'Grieg: Peer Gynt Suites & Sibelius: Pelléas et Mélisande', 248);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (317, 'Mozart Gala: Famous Arias', 249);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (318, 'SCRIABIN: Vers la flamme', 250);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (319, 'Armada: Music from the Courts of England and Spain', 251);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (320, 'Mozart: Symphonies Nos. 40 & 41', 248);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (321, 'Back to Black', 252);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (322, 'Frank', 252);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (323, 'Carried to Dust (Bonus Track Version)', 253);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (324, 'Beethoven: Symphony No. 6 ''Pastoral'' Etc.', 254);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (325, 'Bartok: Violin & Viola Concertos', 255);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (326, 'Mendelssohn: A Midsummer Night''s Dream', 256);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (327, 'Bach: Orchestral Suites Nos. 1 - 4', 257);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (328, 'Charpentier: Divertissements, Airs & Concerts', 258);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (329, 'South American Getaway', 259);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (330, 'Górecki: Symphony No. 3', 260);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (331, 'Purcell: The Fairy Queen', 261);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (332, 'The Ultimate Relexation Album', 262);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (333, 'Purcell: Music for the Queen Mary', 263);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (334, 'Weill: The Seven Deadly Sins', 264);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (335, 'J.S. Bach: Chaconne, Suite in E Minor, Partita in E Major & Prelude, Fugue and Allegro', 265);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (336, 'Prokofiev: Symphony No.5 & Stravinksy: Le Sacre Du Printemps', 248);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (337, 'Szymanowski: Piano Works, Vol. 1', 266);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (338, 'Nielsen: The Six Symphonies', 267);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (339, 'Great Recordings of the Century: Paganini''s 24 Caprices', 268);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (340, 'Liszt - 12 Études D''Execution Transcendante', 269);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (341, 'Great Recordings of the Century - Shubert: Schwanengesang, 4 Lieder', 270);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (342, 'Locatelli: Concertos for Violin, Strings and Continuo, Vol. 3', 271);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (343, 'Respighi:Pines of Rome', 226);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (344, 'Schubert: The Late String Quartets & String Quintet (3 CD''s)', 272);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (345, 'Monteverdi: L''Orfeo', 273);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (346, 'Mozart: Chamber Music', 274);
INSERT INTO [Album] ([AlbumId], [Title], [ArtistId]) VALUES (347, 'Koyaanisqatsi (Soundtrack from the Motion Picture)', 275);
