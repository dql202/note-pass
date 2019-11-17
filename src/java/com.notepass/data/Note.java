package data;

public class Note {
    private String school, professor, course, topic;
    private Boolean isPublic;

    /**Construct a Note give the course, the professor instructing the course,
     * the school that the course was taught, and a description on the contents
     */
    public Note(String school, String professor, String course, String topic, Boolean isPublic) {
        this.school = school;
        this. professor = professor;
        this.course = course;
        this.topic = topic;
        this.isPublic = isPublic;
    }

    /**Getter's for the fields in a Note object*/
    public String getSchool() {
        return this.school;
    }

    public String getProfessor() {
        return this.professor;
    }

    public String getCourse() {
        return this.course;
    }

    public String getTopic() {
        return this.topic;
    }

    public Boolean getIsPublic() {
        return this.isPublic;
    }
}