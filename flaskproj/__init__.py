from flask import Flask, render_template
import sqlite3

import sqlite3
import csv
from flask_cors import CORS


# connect to database
conn = sqlite3.connect("payments.db")
cur = conn.cursor()

#refresh and pull in new fridges database
cur.execute("DROP TABLE IF EXISTS anna;")

cur.execute("""CREATE TABLE anna(
    "AppliedDate" TEXT,
    "DOS" TEXT,
    "CPT" TEXT,
    "PaymentID" INTEGER,
    "PaymentDate" TEXT,
    "AppliedPayments" REAL,
    "PaymentType" TEXT,
    "AcctNo" TEXT,
    "Payer" TEXT
);
""")

cur.execute("DROP TABLE IF EXISTS insurance_tabulated;")

cur.execute("""CREATE TABLE insurance_tabulated(
    "Insurance" TEXT,
    "Avg_Pay" REAL,
    "CPT" INTEGER
);
""")





#connect CSV file to database

file = open("C:/Users/renee/Downloads/cleanedanna.csv")
rows = csv.reader(file)
cur.executemany("INSERT INTO anna VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", rows)

cur.execute("DELETE FROM anna WHERE PaymentType != 'Ins Pmt'")

cur.execute("SELECT DISTINCT Payer FROM anna;")
insurance_short_list = cur.fetchall()
print(insurance_short_list)

cur.execute("SELECT * FROM anna")
desc = cur.description
data = cur.fetchall()


insurance_payment_avg = {}
for company in insurance_short_list:
    visit_money = 0
    depression_money = 0
    depression_counter = 0

    counter = 0
    for datum in data:
        if company[0] == datum[8]:
            if datum[2] == "99214":
                visit_money += datum[5]
                counter += 1
            elif datum[2] == "G0444":
                depression_money += datum[5]
                depression_counter += 1

    visit_money_avg = abs(round(visit_money/counter,2))
    if depression_counter != 0:
        depression_money_avg = abs(round(depression_money/depression_counter,2))
    money = [visit_money_avg, depression_money_avg]
    # insurance_payment_avg[company[0]].append(money)
    insurance_payment_avg[company[0]] = money
print(insurance_payment_avg)



# #pass data from database to a dictionary

column_names = [col[0] for col in desc]
CPT_desc=column_names[2]
Insurance_desc=column_names[8]
print(CPT_desc)


#generate HTML page and pass dictionary to webpage
app = Flask(__name__)

CORS(app)
conn.commit()
conn.close()




@app.route("/")
def index():
    return render_template("table.html", data = insurance_payment_avg) 

@app.route("/data")
def returndata():
    return insurance_payment_avg

app.run()



