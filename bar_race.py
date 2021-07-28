#imports
import pandas as pd
from sqlalchemy import create_engine, inspect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
import numpy as np

def julia_bar_race ():
    database_path= "data/Olympics.sqlite"

    #create engine to db
    engine = create_engine(f"sqlite:///{database_path}")
    conn = engine.connect()

    #used inspector to find table names
    #inspector = inspect(conn)
    #inspector.get_table_names()

    #read the olympicsData table
    full_data=pd.read_sql("SELECT * FROM olympicsData",conn)

    #drops data from 1906 since it is not considered part of olympics
    reduced_data=full_data.loc[(full_data["Year"] !=1906)]

    #gets rid of all team members except one so it just counts one medal for a team
    data=reduced_data.drop_duplicates(subset=['Event','Medal','Sport','Year','NOC']).reset_index(drop = True)

    #groupby data
    my_data=data.groupby(["NOC","Year","Season","City","Sport","Medal","Sex"]).count()

    #eliminate unneeded columns and reset index
    my_data=my_data[['Name']]
    my_data.reset_index(inplace=True)

    #sort the data by year and country
    my_data.sort_values(['Year','NOC'], ascending=(True,True),inplace=True)

    #rename column
    my_data.rename(columns={"Name":"Medals_Won"},inplace=True)

    #saved the following join just in case -- a new table with ioc countries was introduced, but it seems to have 10 missing countries
    
    #data5=pd.read_sql("SELECT o.name,o.Sex,o.NOC,o.Year,o.Season,o.City,o.Sport,"\
    #         +"o.Medal, a.country_name,a.code FROM "\
    #         +"olympicsData as o LEFT JOIN iocData as a ON o.NOC=a.code",conn)


    #dictionary of ISO Countries 
    #I had to hard code this because ISO abbreviations are different from standard abbr
    country_ISO_List = {
        "AFG": "Afghanistan",
        "AHO": "Netherlands Antilles",
        "ALG": "Algeria",
        "ANZ": "Austria",
        "ARG": "Argentina",
        "ARM": "Armenia",
        "AUS": "Australia",
        "AUT": "Austria",
        "AZE": "Azerbaijan",
        "BAH": "Bahamas",
        "BAR": "Barbados",
        "BDI": "Burundi",
        "BEL": "Belgium",
        "BER": "Bermuda",
        "BLR": "Belarus",
        "BOH": "Bohemia",
        "BOT": "Botswana",
        "BRA": "Brazil",
        "BRN": "Bahrain",
        "BUL": "Bulgaria",
        "CAN": "Canada",
        "CHI": "Chile",
        "CHN": "China",
        "CIV": "Côte d'Ivoire",
        "CMR": "Cameroon",
        "COL": "Colombia",
        "CRC": "Costa Rica",
        "CRO": "Croatia",
        "CUB": "Cuba",
        "CYP": "Cyprus",
        "CZE": "Czechia",
        "DEN": "Denmark",
        "DJI": "Djibouti",
        "DOM": "Dominican Republic",
        "ECU": "Ecuador",
        "EGY": "Egypt",
        "ERI": "Eritrea",
        "ESP": "Spain",
        "EST": "Estonia",
        "ETH": "Ethiopia",
        "EUN" : "Unified Team",
        "FIJ": "Fiji",
        "FIN": "Finland",
        "FRA": "France",
        "FRG": "Germany",    
        "GAB": "Gabon",
        "GBR": "Great Britain",
        "GDR": "East Germany",
        "GEO": "Georgia",
        "GER": "Germany",
        "GHA": "Ghana",
        "GRE": "Greece",
        "GRN": "Grenada",
        "GUA": "Guatemala",
        "GUY": "Guyana",
        "HAI": "Haiti",
        "HKG": "Hong Kong",
        "HUN": "Hungary",
        "INA": "Indonesia",
        "IND": "India",
        "IOA": "Individual",
        "IRI": "Iran",
        "IRL": "Ireland",
        "IRQ": "Iraq",
        "ISL": "Iceland",
        "ISR": "Israel",
        "ISV": "Virgin Islands",
        "ITA": "Italy",
        "JAM": "Jamaica",
        "JOR": "Jordan",
        "JPN": "Japan",
        "KAZ": "Kazakhstan",
        "KEN": "Kenya",
        "KGZ": "Kyrgyzstan",
        "KOR": "South Korea",
        "KSA": "Saudi Arabia",
        "KUW": "Kuwait",
        "LAT": "Latvia",
        "LIB": "Lebanon",
        "LIE": "Liechtenstein",
        "LTU": "Lithuania",
        "LUX": "Luxembourg", 
        "MAR": "Morocco",
        "MAS": "Malaysia",
        "MDA": "Moldova",
        "MEX": "Mexico",
        "MGL": "Mongolia",
        "MKD": "Macedonia",
        "MNE": "Montenegro",
        "MON": "Monaco",
        "MOZ": "Mozambique",
        "MRI": "Mauritius",
        "NAM": "Namibia",
        "NED": "Netherlands",
        "NEP": "Nepal",
        "NGR": "Nigeria",
        "NIG": "Nicaragua",
        "NOR": "Norway",
        "NZL": "New Zealand",
        "PAK": "Pakistan",
        "PAN": "Panama",
        "PAR": "Paraguay",
        "PER": "Peru",
        "PHI": "Philippines",
        "POL": "Poland",
        "POR": "Portugal",
        "PRK": "North Korea",
        "PUR": "Puerto Rico",
        "QAT": "Qatar",
        "ROU": "Romania",
        "RSA": "South Africa",
        "RUS": "Russia",
        "SCG": "Serbia and Montenegro",
        "SEN": "Senegal",
        "SGP": "Singapore",
        "SLO": "Slovenia",
        "SRB": "Serbia",
        "SRI": "Sri Lanka",
        "SUD": "Sudan",
        "SUI": "Switzerland",
        "SUR": "Suriname",
        "SVK": "Slovakia",
        "SWE": "Sweden",
        "SYR": "Syrian Arab Republic",
        "TAN": "Tanzania",
        "TCH": "Czechoslovakia",
        "TGA": "Tonga",
        "THA": "Thailand",
        "TJK": "Tajikistan",
        "TOG": "Togo",
        "TPE": "China",
        "TTO": "Trinidad and Tobago","TUN": "Tunisia",
        "TUN": "Tunisia",
        "TUR": "Turkey",
        "UAE": "United Arab Emirates",
        "UAR": "Egypt",
        "UGA": "Uganda",
        "UKR": "Ukraine",
        "URS": "Russia",
        "URU": "Uruguay",
        "USA": "United States",
        "UZB": "Uzbekistan",
        "VEN": "Venezuela",
        "VIE": "Vietnam",
        "WIF": "Wallis and Futuna",
        "YUG": "Yugoslavia",
        "ZAM": "Zambia",
        "ZIM": "Zimbabwe"
    }


    #setup db of coutnries
    countryNames=pd.DataFrame({
        "NOC":list(country_ISO_List.keys()),
        "Name":list(country_ISO_List.values())
    })

    #merged newly created country-name db with olympics
    db_merged=pd.merge(my_data,countryNames,on="NOC",how="inner")

    #renamed column
    db_merged.rename(columns={"NOC":"Country"},inplace=True)

    #reordered columns more logically
    db_merged=db_merged[['Year','Season','City','Country', 'Name','Sex','Sport','Medal','Medals_Won']]

    #sort by country and year, which I now realize i did prematurely earlier
    db_merged.sort_values(['Year','Country'],inplace=True)
    
    return db_merged


