package splitwisedb.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import splitwisedb.Modal.Smodel;

@Repository
public interface Srepo  extends JpaRepository<Smodel, Integer>{
   Optional<Smodel>  findByEmail(String m);
}
