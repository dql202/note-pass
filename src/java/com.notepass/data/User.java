package data;

public class User {
    private String username, email, school;

    /*** Construct a User object given a username, email address, and school name*/
    public User(String username, String email, String school) {
        this.username = username;
        this.email = email;
        this.school = school;
    }

    /**Get the username of this User*/
    public String getUsername() {
        return this.username;
    }

    /**Get the email address of this User*/
    public String getEmail() {
        return this.email;
    }

    /**Get the school that this User attends*/
    public String getSchool() {
        return this.school;
    }
}