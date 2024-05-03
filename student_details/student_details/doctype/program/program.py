import frappe
from frappe.model.document import Document
import re

class Program(Document):
	pass

@frappe.whitelist()
def calculate_credits(courses):

	# Get all course names
	names = re.findall(r'"courses":"([^"]+)"', courses)
	credits = 0

	
	for name in names:
		doc = frappe.get_doc('Course', name)
		credits += doc.credits
		"""
		Calculate and return total credits
		"""
	return str(credits)