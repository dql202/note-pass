package data;

import java.util.ArrayList;

public class test {
    public static void main(String[] args) {
        DBManager db = new DBManager();
        db.insertSchool("New York University");
        ArrayList<String> schools = db.getAllSchools();
        for (String school : schools) {
            System.out.println(school);
        }
    }
}
