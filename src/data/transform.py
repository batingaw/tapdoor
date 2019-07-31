import xlrd
import json

wb = xlrd.open_workbook('quiz.xlsx')

sh = wb.sheet_by_index(1)

quizes = []

for rownum in range(sh.nrows):
	row_values = sh.row_values(rownum)
	if rownum > 0 and  row_values[0] != "":
		quiz = {
			"no": str(row_values[0])[:-2],
			"question": row_values[1],
			"answer": row_values[2]
		}
		quizes.append(quiz)
	
j = json.dumps(quizes)

with open('quiz.js', 'w') as f:
	f.write('export const Quiz=')
	f.write(j)