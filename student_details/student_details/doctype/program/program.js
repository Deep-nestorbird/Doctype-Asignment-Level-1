frappe.ui.form.on("Program",{onload:function(frm){
     frm.set_query("instructor",()=>
    {   return {
        "filters":{"designation":"Instructor"}
    };
    });
    },
     after_save:function(frm)
    {
        
        // Calculate total credits
        frm.call({
            doc: frm.foc,
            method: 'student_details.student_details.doctype.program.program.total_credits', 
            args:{
                courses: frm.doc.courses,
            },
            callback:function(res){
               sumCredits = parseFloat(res.message);
                frm.set_value('total_credits', sumCredits);
            }   
           
        })
    },
    preview_participant: function( cdt, cdn) {
        var row = locals[cdt][cdn];
        var student = row.participant;
        frappe.call({
            method: "show_student_picture",
            args: {
                "student": student
            },
            callback: function(r) {
                if (r.message) {
                    var dialog = new frappe.ui.Dialog({
                        title: __('Participant Picture'),
                        fields: [
                            {
                                fieldtype: 'HTML',
                                options: r.message
                            }
                        ]
                    });
                    dialog.show();
                }
            }
        });
    }
});  