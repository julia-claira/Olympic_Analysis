#imports
import pandas as pd
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import Session


def corr_data ():
    database_path= "data/Olympics.sqlite"

    #create engine to db
    engine = create_engine(f"sqlite:///{database_path}")
    conn = engine.connect()

    #read the olympicsData table
    data=pd.read_sql("SELECT * FROM popData",conn)

    return data
