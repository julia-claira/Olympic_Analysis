#imports
import pandas as pd


def myGDP ():


    path="data/GDP_by_Year.csv"
    julia_gdp=pd.read_csv(path)

    
    return julia_gdp


