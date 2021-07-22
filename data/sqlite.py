import sqlite3
import csv
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#### Created sqlite file and tables within
conn = sqlite3.connect("project3_group_springy_olympics/data/Olympics.sqlite")
cur = conn.cursor()
cur.execute('CREATE TABLE dictionary (Country TEXT, Code TEXT, Population INTEGER, "GDP per Capita" REAL)')
cur.execute('CREATE TABLE summer (Year INTEGER, City TEXT, Sport TEXT, Discipline TEXT, Athlete TEXT, Country TEXT, Gender TEXT, Event TEXT, Medal TEXT)')
cur.execute('CREATE TABLE winter (Year INTEGER, City TEXT, Sport TEXT, Discipline TEXT, Athlete TEXT, Country TEXT, Gender TEXT, Event TEXT, Medal TEXT)')
conn.commit()
conn.close()

#### Insert CSVs into sqlite file
conn = sqlite3.connect("project3_group_springy_olympics/data/Olympics.sqlite")
cur = conn.cursor()
with open ('project3_group_springy_olympics/data/dictionary.csv', 'r') as fin:
    dr = csv.DictReader(fin)
    to_db = [(i['Country'], i['Code'], i['Population'], i['GDP per Capita']) for i in dr]

cur.executemany("INSERT INTO dictionary (Country, Code, Population, 'GDP per Capita') VALUES (?, ?, ?, ?);", to_db)
conn.commit()
conn.close()

conn = sqlite3.connect("project3_group_springy_olympics/data/Olympics.sqlite")
cur = conn.cursor()
with open ('project3_group_springy_olympics/data/summer.csv', 'r') as fin:
    dr = csv.DictReader(fin)
    to_db = [(i['Year'], i['City'], i['Sport'], i['Discipline'], i['Athlete'], i['Country'], i['Gender'], i['Event'], i['Medal']) for i in dr]
cur.executemany("INSERT INTO summer (Year, City, Sport, Discipline, Athlete, Country, Gender, Event, Medal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", to_db)
with open ('project3_group_springy_olympics/data/winter.csv', 'r') as fin:
    dr = csv.DictReader(fin)
    to_db = [(i['Year'], i['City'], i['Sport'], i['Discipline'], i['Athlete'], i['Country'], i['Gender'], i['Event'], i['Medal']) for i in dr]

cur.executemany("INSERT INTO winter (Year, City, Sport, Discipline, Athlete, Country, Gender, Event, Medal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", to_db)
conn.commit()
conn.close()
