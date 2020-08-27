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



//


    <nav class="navbar navbar-expand-lg navbar-light navbar-default">
        <div class="container-fluid">
            <a class="navbar-brand" href="/campgrounds">YelpCamp</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="nav navbar-nav navbar-right">
                    <% if(!currentUser){ %>
                        <li>
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                        <li>
                            <a class="nav-link" href="/register">SignUp</a>
                        </li>
                        <%}else{%>
                            <li>
                                <a href="#">Signed in as
                            <%- currentUser.username %></a>
                            </li>
                            <li>
                                <a class="nav-link " href="/logout ">LogOut</a>
                            </li>
                            <%}%>
                </ul>
            </div>
        </div>
    </nav>
