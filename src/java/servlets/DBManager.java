package DatabaseConnect;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import java.util.Properties;

public class DBManager {
    private String dbms, serverName, portNum;
    private String username, password;

    public DBManager() {
        dbms = "mysql";
        serverName = "localhost";
        portNum = "8889";
        username = "root";
        password = "root";
    }

     Connection getConnection() throws SQLException {
        Connection conn = null;
        Properties connectionProps  = new Properties();

        connectionProps.put("user", this.username);
        connectionProps.put("password", this.password);

        // Example: "jdbc:mysql://localhost:8889/"
        String dbURL = "jdbc:" + this.dbms + "://" + this.serverName + ":" + this.portNum + "/";
        conn = DriverManager.getConnection(dbURL, connectionProps);

        System.out.println("Connected to database");
        return conn;
    }
}