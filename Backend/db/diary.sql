DROP TABLE IF EXISTS Diary;

CREATE TABLE Diary (
    DiaryID INT GENERATED ALWAYS AS IDENTITY,
    Words VARCHAR(500) NOT NULL,
    Date DATE DEFAULT CURRENT_DATE,
    Time TIME DEFAULT CURRENT_TIME,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (DiaryID)
);

INSERT INTO Diary(Words, category) VALUES ('Testing','Test'), ('ABCDE', 'ABC'), ('12345', '123');

-- DROP TABLE IF EXISTS Diary;

-- CREATE TABLE Diary (
--     DiaryID INT GENERATED ALWAYS AS IDENTITY,
--     Words VARCHAR(500) NOT NULL,
--     Date DATE NOT NULL,
--     Time TIME NOT NULL,
--     category VARCHAR(100) NOT NULL,
--     PRIMARY KEY (DiaryID)
-- );

-- INSERT INTO Diary(Words, category, Date, Time) VALUES ('Testing','Test', '2023-10-05', '16:00:00'), ('ABCDE', 'ABC', '2023-10-05', '16:00:00'), ('12345', '123', '2023-10-05', '16:00:00');
