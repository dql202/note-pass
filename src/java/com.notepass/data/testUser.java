package data;

import java.util.ArrayList;

public class testUser {
    public static void main(String[] args) {
        DBManager db = new DBManager();
        db.insertUser("test_user","email@email.com","New York University");
        ArrayList<String> users = db.getAllSchools();
        for (String user : users) {
            System.out.println(user);
        }
    }
}
