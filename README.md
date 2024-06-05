Countdown Cookie 

By  

Ardyan C. Perez 

Gerard P. Zapanta 

Introduction 

	The main objective of this website called Countdown Cookie is to provide users with a dynamic and engaging platform to manage and track important events. Integrating a real time countdown timer, weather updates and weather WebSocket, this website aims to give users a smooth and user-friendly experience with the following goals: 

 
1.) Event Management: Enable users to create, track, and manage personal or professional events with precision and ease, ensuring they never miss an important date or deadline. 

2.) Weather Integration: Offer localized weather information for various cities, allowing users to plan their events with consideration of the current and forecasted weather conditions. 

3.) User Engagement: Foster a user-friendly and visually appealing interface that encourages frequent interaction and engagement, making the platform a go-to tool for event management. 

4.) Accessibility and Responsiveness: Ensure the website is accessible across various devices and platforms, providing a seamless experience whether users are on their desktops, tablets, or smartphones. 



Main Features 

 
1.) Event Creation and Management: 

      Add Events - Users can create events by specifying the event name, date, and time. 

      Event List - Display a list of all created events with countdown timers. 

      Delete Events - Option to delete events, which also stops the associated countdown timer. 

 

2.) Real-Time Countdown Timers: 

      Accurate Timing - Display precise countdowns for days, hours, minutes, and seconds until the event starts. 

      Automatic Updates - Timers update every second to ensure real-time accuracy. 

 

3.) Search Events: 

      Search Functionality: Users can search for specific events by name using the search bar. 

 

4.) Weather: 

      Weather Information: Display current weather conditions for multiple cities. 

      Temperature and Description: Show temperature in Celsius and a brief description of the weather. 

      City List: Predefined list of cities for which weather data is displayed. 

 

5.) Form Handling and Validation: 

      Form Validation: Ensure that users enter valid dates and times for events. 

      Reset Form: Option to reset the event creation form. 

 

6.) User Interface and Design: 

      Responsive Design: The website is fully responsive, providing a seamless experience across desktops, tablets, and smartphones. 

      User-Friendly Layout: Intuitive navigation and easy-to-use forms for event creation and management. 

Web Api 

1.) Flatpickr - was used to enhance the user experience when creating events by providing a user-friendly interface for selecting dates and times. The functionalities are the following: 

      Date Selection: Users can easily select event dates using the Flatpickr date picker, ensuring accurate date input in the desired format ("Y-m-d"). 

      Time Selection: Flatpickr also allows users to select event times without the need for a separate time picker, simplifying the input process. 

 

2.) OpenweatherMap - The OpenWeatherMap API was used to provide users with real-time weather information for multiple cities, enhancing their event planning capabilities. The functionalities are the following: 

      Weather Data: The API fetches current weather data (temperature and description) for predefined cities specified in the ‘citiesAndCountries’ array. 

      Display: The fetched weather information is displayed on the website, allowing users to consider weather conditions when planning events. 

      Integration: By integrating weather data, Countdown Cookie provides a comprehensive view of event details, including potential weather impacts, helping users make informed decisions about their plans. 

Program Structure 


[flowcharty.pdf](https://github.com/user-attachments/files/15584953/flowcharty.pdf)

 
