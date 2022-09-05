package be.question.repository;

import be.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Table;
import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByTitle(String title);


    Page<Question> findAllByQuestionStatus(Pageable pageable,Question.QuestionStatus questionStatus);//삭제된 글 빼고 전체 질문글 가져옴

}