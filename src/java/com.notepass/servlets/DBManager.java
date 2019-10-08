import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import java.util.Properties;

public class DBManager {
    private String dbms, hostName, portNum;
    private String username, password;

    public DBManager() {
        dbms = "mysql";
        hostName = "localhost";
        portNum = "8889";
        username = "root";
        password = "root";
    }

    Connection getConnection() {
        Connection conn = null;

        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Properties connectionProps  = new Properties();
            connectionProps.put("user", this.username);
            connectionProps.put("password", this.password);

            // Example: "jdbc:mysql://localhost:8889/?useSSL=false"
            String dbURL = "jdbc:" + this.dbms + "://" + this.hostName + ":" + this.portNum + "/?useSSL=false";
            conn = DriverManager.getConnection(dbURL, connectionProps);

            System.out.println("Connected to database");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }
}