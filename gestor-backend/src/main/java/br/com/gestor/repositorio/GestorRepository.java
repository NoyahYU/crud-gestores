package br.com.gestor.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.gestor.model.GestorModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import java.sql.Savepoint;
import java.util.List;

public interface GestorRepository extends CrudRepository<GestorModel, Integer> {
    // Listar todos os gestores
    List<GestorModel> findAll();
}