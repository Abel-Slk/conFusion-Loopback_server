// here I'm going to set up the code to create an admin user by default
// Because this script is in server/boot, it is executed when the application starts up, so the admin user will always exist once the app initializes.
// see https://loopback.io/doc/en/lb3/Creating-a-default-admin-user.html

module.exports = function(app) { // The app is the Loopback app, which will be supplied as a parameter to this function
    var Customer = app.models.Customer; // get access to the customer model

    Customer.findOne({ username: 'Admin' }, // we'll first try to see if a user with the name admin already exists
        (err, users) => { // to fire upon completion of findOne()
            if (!users) { // if there are no users at all
                Customer.create( // takes an array of objects - the user accounts we want to create. Right now the only user account that I want to create is 'Admin'. this will be the default administrator for my loopback server
                    [
                        { 
                            username: 'Admin', 
                            email: 'admin@confusion.net', 
                            password: 'password' 
                        } // can also supply the first name and the last name, But those are not required for the admin user
                    ],
                    (err, users) => { // to fire upon completion of create()
                        if (err) throw err; // we don't know what else to do so we'll just simply throw the err

                        var Role = app.models.Role;
                        var RoleMapping = app.models.RoleMapping;

                        RoleMapping.destroyAll(); // if the database already contains any RoleMapping that already exists, then I'm going to destroy all those when I start my server

                        Role.findOne({ name: 'admin' }, // see if a role with name 'admin' already exists
                            (err, role) => {
                                if (err) throw err;

                                if (!role) {
                                    Role.create({ name: 'admin' },
                                        (err, role) => {
                                            if (err) throw err;

                                            // otherwise - map this role to this particular user that I have just created - like this:
                                            role.principals.create(
                                                {
                                                    principalType: RoleMapping.USER,
                                                    principalId: users[0].id // users is the array that we've created above, and in this case it will contain only one user
                                                },
                                                (err, principal) => { // to fire upon completion of create()
                                                    if (err) throw err;
                                                }
                                            );
                                        }
                                    );
                                }
                                else { // I can do the mapping at once (no need to create a role first)
                                    role.principals.create(
                                        {
                                            principalType: RoleMapping.USER,
                                            principalId: users[0].id
                                        },
                                        (err, principal) => {
                                            if (err) throw err;
                                        }
                                    );
                                }
                            }
                        )
                    }
                )
            }
        }    
    )
}