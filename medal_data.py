# Import dependencies
import requests
import pandas as pd
from sqlalchemy import create_engine, inspect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
import csv


def pie_chart():

    # Connect to database
    database_path= "data/Olympics.sqlite"
    engine = create_engine(f"sqlite:///{database_path}")
    conn = engine.connect()
    inspector = inspect(conn)
    ioc_data = pd.read_sql("SELECT * FROM iocData", conn)
    data = pd.read_sql("SELECT * FROM olympicsData",conn)
    conn.close()

    # Clean data

    # Rename column to merge on it
    ioc_data.rename(columns={"code":"NOC"},inplace=True)
    # Merge tables
    medals_data=pd.merge(data,ioc_data,on="NOC",how="inner")
    # Drop columns
    medals_data = medals_data.drop(['Name', 'Height', 'Weight', 'Games', 'index', 'ID', 'Team'], axis=1)

    # Group by colum
    medals_data = medals_data.groupby(["country_name","Year","Event","Medal","Sex" ]).count()
    
    # Create a medal count column and reset index
    medals_data=medals_data[['NOC']]
    medals_data.reset_index(inplace=True)
    
    # Rename column
    medals_data.rename(columns={"NOC":"MedalsWon"},inplace=True)

    return medals_data

