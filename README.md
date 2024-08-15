
# Serenity Scoops

Serenity Scoops is an interactive and engaging ice cream shop application designed to offer users a delightful experience in exploring and managing a variety of unique ice cream flavors. The application allows users to browse through different flavors, place orders, view their order history, and manage the flavor inventory through an admin panel. Built with React.js, Serenity Scoops provides a user-friendly interface and simulates backend operations using JSON Server.

Functionalities
Home Page:

Welcome Message: The homepage welcomes users with a captivating message, setting the tone for the luxurious experience Serenity Scoops offers.
Flavor Slideshow: The homepage features a dynamic slideshow displaying different ice cream flavors. Each slide showcases the flavor’s image and name, giving users a visual introduction to the available options.
About Us Section: A dedicated section provides users with information about Serenity Scoops, highlighting the shop’s mission, values, and unique selling points.
Explore Flavors Button: A prominent button that directs users to the Explore Flavors page, where they can see all the available ice cream flavors.
Flavor Exploration:

Flavor List: Users can explore a comprehensive list of ice cream flavors, each displayed with its image, name, and a brief description.
Flavor Details: By clicking on a specific flavor, users are taken to a detailed view that includes an in-depth description, price, and reviews. Users can also select the quantity they wish to order.
Search Functionality: A search bar allows users to quickly find specific flavors by typing in keywords.
Order Placement:

Make Order: On the Flavor Detail page, users can specify the quantity of a flavor they want to order and place the order. The application handles order creation and adds the order to the user's order history.
Order Validation: The application checks if the selected quantity is available before allowing the order to be placed, ensuring accurate inventory management.
Order History:

View Orders: Users can view their past orders, which include details such as the flavor name, quantity, price, and the date of the order.
Delete Orders: Each order entry includes a delete button, allowing users to remove orders from their history.
Admin Panel:

Manage Flavors: The admin panel allows administrators to add, edit, and delete ice cream flavors. This ensures that the flavor inventory is always up-to-date.
Add New Flavors: Admins can fill out a form with details such as name, description, price, image URL, category, and servings to add new flavors to the database.
Edit Existing Flavors: Admins can update the details of existing flavors, including changing the flavor's description, price, and other attributes.
Delete Flavors: Admins can remove flavors from the inventory, which will also be reflected in the database.
Dynamic Flavor Management:

Auto-Incrementing IDs: When adding new flavors, the system automatically generates a unique ID, eliminating the need for manual entry.
Real-Time Updates: Changes made through the admin panel (adding, editing, or deleting flavors) are immediately reflected in the database and the application interface.

## Authors

- [@abudhosamuel](https://www.github.com/abudhosamuel)
- [@JAmwenya](https://www.github.com/JAmwenya)
- [@ivylucy09](https://www.github.com/ivylucy09)
- [@FathiMohamedBille](https://www.github.com/FathiMohamedBille)




## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Android Studio](https://img.shields.io/badge/android%20studio-346ac1?style=for-the-badge&logo=android%20studio&logoColor=white)

## Deployment

To deploy this project run


npm install
```

## Installation and Setup

To run the project locally, follow these steps:

**Clone the repository:**


   git clone <https://github.com/abudhosamuel/icecream>
   cd icecream

Set up the JSON server:

The db.json file contains mock data for the bots. You can start the JSON server to serve this data:

npm run server or json-server --watch db.json --port 3001
The server will run on http://localhost:3001 (or the port you configured).

Start the React app:

In a separate terminal, start the React application:

npm start
The React app will run on http://localhost:3000 by default.

Access the application:

Open your web browser and navigate to http://localhost:3000 to view the application.

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Acknowledgements

Acknowledgements
React
JSON Server
Font Awesome
Feel free to contribute to the project by submitting a pull request or opening an issue.

