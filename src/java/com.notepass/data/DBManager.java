//package servlets;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//
//import java.util.Properties;
//public class DBManager {
//    private String dbms, server, userName, password, portNumber, dbName;
//    private Connection conn;
//
//    public DBManager() {
//        this.dbms = "mysql";
//        this.server = "localhost";
//        this.dbName = "notepass";
//        this.portNumber = "8889";
//        this.userName = "root";
//        this.password = "root";
//    }
//
//    public Connection getConnection() {
//
//        Connection conn = null;
//
//        try {
//            Class.forName("com.mysql.jdbc.Driver").newInstance();
//            Properties connectionProps = new Properties();
//            connectionProps.put("user", this.userName);
//            connectionProps.put("password", this.password);
//
//            String url = "jdbc:" + this.dbms + "://" + this.server + ":" + this.portNumber + "/?useSSL=false";
//            conn = DriverManager.getConnection(url, connectionProps);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        System.out.println("Connected to database");
//        return conn;
//    }
//
//    public boolean insertSchool(String school) {
//        return false;
//    }
//}

package data;

import java.sql.*;

import java.util.ArrayList;
import java.util.Properties;

public class DBManager {
    private String dbms, server, userName, password, portNumber, dbName;

    public DBManager() {
        this.dbms = "mysql";
        this.server = "localhost";
        this.dbName = "notepass";
        this.portNumber = "8889";
        this.userName = "root";
        this.password = "root";
    }

    /**
     * IT IS THE RESPONSIBILITY OF THE CALLER TO CLOSE THE CONNECTION.
     * @return - a connection to the database if all goes well.
     */
    private Connection getConnection() {
        Connection conn = null;

        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Properties connectionProps = new Properties();
            connectionProps.put("user", this.userName);
            connectionProps.put("password", this.password);

            String url = "jdbc:" + this.dbms + "://" + this.server + ":" + this.portNumber
                        + "/" + this.dbName + "?useSSL=false";
            conn = DriverManager.getConnection(url, connectionProps);
        } catch (Exception e) {
            System.err.println("Could not establish connection with the database.");
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * @param school - The name of the school to be inserted.
     * @return true if school was successfully inserted in Database, false otherwise.
     */
    public boolean insertSchool(String school) {
        boolean isSuccess = false;
        try {
            String insertSchoolQuery = "INSERT INTO Schools(School) VALUES (?)";
            Connection conn = this.getConnection();
            PreparedStatement stmt = conn.prepareStatement(insertSchoolQuery);
            stmt.setString(1, school);
            stmt.executeUpdate();
            stmt.close();
            conn.close();
            isSuccess = true;
        } catch (SQLException e) {
            System.err.println("Could not insert in 'Schools' table");
            e.printStackTrace();
        }
        return isSuccess;
    }
    /**
     * @param user - The name of the user to be inserted.
     * @param email - The name of the email to be inserted.
     * @param school - The name of the school to be inserted.
     * @return true if user was successfully inserted in Database, false otherwise.
     */
    public boolean insertUser(String user,String email, String school) {
        boolean isSuccess = false;
        try {
            String insertUserQuery = "INSERT INTO Users(Username,Email,School) VALUES (?)";
            Connection conn = this.getConnection();
            PreparedStatement stmt = conn.prepareStatement(insertUserQuery);
            stmt.setString(1, user);
            stmt.setString(2, email);
            stmt.setString(3, school);
            stmt.executeUpdate();
            stmt.close();
            conn.close();
            isSuccess = true;
        } catch (SQLException e) {
            System.err.println("Could not insert in 'Users' table");
            e.printStackTrace();
        }
        return isSuccess;
    }
    /**
     * @return an ArrayList of strings for all the names in the Schools table.
     */
    public ArrayList<String> getAllSchools() {
        ArrayList<String> schools = new ArrayList<>();
        try {
            String getAllSchoolsQuery = "SELECT School FROM Schools";
            Connection conn = this.getConnection();
            PreparedStatement stmt = conn.prepareStatement(getAllSchoolsQuery);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                schools.add(results.getString("School"));
            }

            stmt.close();
            conn.close();
        } catch (SQLException e) {
            System.err.println("Could not insert in 'Schools' table");
            e.printStackTrace();
        }
        return schools;
    }

    /**
     * @return an ArrayList of Request objects made from data in Requests table
     */
    public ArrayList<Request> getAllRequests() {
        ArrayList<Request> requests = new ArrayList<>();
        try {
            String getAllRequestsQuery = "SELECT * FROM Requests";
            Connection conn = this.getConnection();
            PreparedStatement stmt = conn.prepareStatement(getAllRequestsQuery);
            ResultSet results = stmt.executeQuery();

            Integer note, owner, requester;
            while (results.next()) {
                note = results.getInt("NoteID");
                owner = results.getInt("OwnerID");
                requester = results.getInt("RequesterID");
                requests.add(new Request(note, owner, requester));
            }

            stmt.close();
            conn.close();
        } catch (SQLException e) {
            System.err.println("Could not get requests.");
            e.printStackTrace();
        }
        return requests;
    }
}