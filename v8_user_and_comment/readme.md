RESTFUL ROUTS 

name      url          verb    desc
=========================================================
INDEX    /dogs          GET     display a list of all dogs.
NEW      /dogs/new      GET     display a form to make dogs.
CREATE    /DOGS         POST     Add a new dog to database.
SHOW      /dogs:id      GET       show info about none dog.
EDIT      /dogs/:id/edit   GET     show edit form for one dog.
UPDATE    /doggs:id       PUT       update a particular dog.then redirect somewhere.
DESTROY    /dogs/:id       DELETE    Delete a particular do ,then reditrect somewhere.
