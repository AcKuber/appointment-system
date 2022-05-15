<div id="top"></div>

<br />



<!-- ABOUT THE PROJECT -->
## About The Project


This is online appointment system which allows user to book appointment with any officer. It contains three entity Officer, Visitor and Activity.



### Built With

* [Laravel](https://laravel.com)
* [TailWindCSS](https://tailwindcss.com/)
* [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
.

### Prerequisites

* 	Composer(https://getcomposer.org/)
  ```

### Installation

1. Clone the repo
   git clone https://github.com/AcKuber/appointment-system
   ```
2. Install composer dependencies
   
   composer install
   ```
3. Generate .env file

   copy .env.example .env

 4. Generate application key

 	php artisan key:generate

 5. Open phpmyadmin or your favorite mysql databse acccess interface

 6. Create database (say online-appointment)

 7. Import sql file 'sql_dump.sql' [which can be found at (appointment-system/database/sql_dump.sql)]

 8. Change database name in .env file as you created [say DB_DATABASE=online_appointment]

 9. Run the project
 	php artisan serve 
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
