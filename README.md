<p>
<img width="200" src="https://lh4.googleusercontent.com/yUzaviDgzDIq4-ZHp9k0YU5fsz0nOdekNRt1qHgp7Qdlw5BNfe6bETEf5ZWd-Vkn_m57BPx7HcDrwFK41ptLnQLTNipWmTAtiQwZL_8s97Nkzn94xP7XVKb3RnV0fx8QEZoxlkVd" align="right" >
</p>

# Pickably

## The project

PICKABLY is a web application gamified of real time interaction perfect for education, work and fun.

The web application is composed by:
<p>
<img height="270" src="https://s3.amazonaws.com/intranet-projects-files/holbertonschool-higher-level_programming+/268/8-index.png" align="left" >
</p>

-   A command interpreter to manipulate data without a visual interface, like in a Shell (perfect for development and debugging)

-   A website (the front-end) that shows the final product to everybody: static and dynamic

-   A database or files that store data (data = objects)

-   An API that provides a communication interface between the front-end and your data (retrieve, create, delete, update them)

## The console

The console is a command line interpreter but limited to a specific use-case. In this case it will be able to manage the objects of our AirBnb clone  project:

-   Create a new object (ex: a new User or a new Place)

-   Retrieve an object from a file, a database etc…

-   Do operations on objects (count, compute stats, etc…)

-   Update attributes of an object

-   Destroy an object                                                                                

### Execution (How to start it?)
The shell works like this in interactive mode:
```
$ ./console.py
(hbnb)
```

But also in non-interactive mode:
```
$ echo "help" | ./console.py
(hbnb)
```
### How to use it?
**NOTE:** you can use the ***help*** option with all the commands implemented to see the respective documentation.
```
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  help  quit
```
i.e.
```
(hbnb) help quit
Quit command to exit the program
```
- **`quit`** and **`EOF`** to exit the program

i.e.
```
$ ./console.py
(hbnb) quit 
$
```
- **`create`**: Creates a new instance of `BaseModel`, saves it (to the JSON file) and prints the `id`.

*Syntax:* `$ create [CLASS]`

i.e.
```
(hbnb) create BaseModel
49faff9a-6318-451f-87b6-910505c55907
```
- **`show`**: Prints the string representation of an instance based on the class name and `id`.

*Syntax:* `$ show [CLASS] [ID]`

i.e.
```
(hbnb) show BaseModel 49faff9a-6318-451f-87b6-910505c55907
[BaseModel] (49faff9a-6318-451f-87b6-910505c55907) {'created_at': datetime.datetime(2017, 10, 2, 3, 10, 25, 903293), 'id': '49faff9a-6318-451f-87b6-910505c55907', 'updated_at': datetime.datetime(2017, 10, 2, 3, 10, 25, 903300)}
```
- **`destroy`**: Deletes an instance based on the class name and `id` (save the change into the JSON file).

*Syntax:* `$ destroy [CLASS] [ID]`

i.e.
```
(hbnb) destroy BaseModel 49faff9a-6318-451f-87b6-910505c55907
```
- **`all`**: Prints all string representation of all instances based or not on the class name.

*Syntax:* `$ all [CLASS]` or `$ all`

i.e.
```
(hbnb) all BaseModel
["[BaseModel] (2dd6ef5c-467c-4f82-9521-a772ea7d84e9) {'id': '2dd6ef5c-467c-4f82-9521-a772ea7d84e9', 'created_at': datetime.datetime(2017, 10, 2, 3, 11, 23, 639717), 'updated_at': datetime.datetime(2017, 10, 2, 3, 11, 23, 639724)}", "[BaseModel] (49faff9a-6318-451f-87b6-910505c55907) {'first_name': 'Betty', 'id': '49faff9a-6318-451f-87b6-910505c55907', 'created_at': datetime.datetime(2017, 10, 2, 3, 10, 25, 903293), 'updated_at': datetime.datetime(2017, 10, 2, 3, 11, 3, 49401)}"]
```
- **`update`**: Updates an instance based on the class name and `id` by adding or updating attribute (save the change into the JSON file).

*Syntax:* `$ update [CLASS] [ID] [ATTRIBUTE] [VALUE]`

i.e.
```
(hbnb) update BaseModel 49faff9a-6318-451f-87b6-910505c55907 first_name "Betty"
```
**If a command is missing an argument or it does not exist, a message will be displayed:**

i.e.
```
(hbnb) all MyModel
** class doesn't exist **
(hbnb) destroy
** class name missing **
```
### Authors

-   Emma Gachancipa..................
[![alt text][1.1]][1][![alt text][3.1]][3][![alt text][4.1]][4]

-   Geraldinne Bohórquez.............
[![alt text][1.1]][5][![alt text][3.1]][7][![alt text][8.1]][8]

[1.1]: http://i.imgur.com/tXSoThF.png (Twitter)
[3.1]: http://i.imgur.com/0o48UoR.png (Github)
[4.1]: https://i.imgur.com/TJRr1iY.png (Linked[in])
[5.1]: http://i.imgur.com/tXSoThF.png (Twitter)
[7.1]: http://i.imgur.com/0o48UoR.png (Github)
[8.1]: https://i.imgur.com/TJRr1iY.png (Linked[in])

[1]: http://www.twitter.com/emm_coded
[3]: https://www.github.com/julgachancipa
[4]: https://www.linkedin.com/in/emma-juliana-gachancipa-castelblanco-4b3667188
[5]: https://twitter.com/geraldinnebohr
[7]: http://www.github.com/geraldinnebohr
[8]: https://www.linkedin.com/in/geraldinnebohr
