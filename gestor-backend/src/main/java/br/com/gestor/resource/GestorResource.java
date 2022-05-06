package br.com.gestor.resource;

import br.com.gestor.model.GestorModel;
import br.com.gestor.repositorio.GestorRepository;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NamedStoredProcedureQueries;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping (path = "/gestores") // listar todos os gestores
public class GestorResource {
    @Autowired
    private GestorRepository repository;

    //Metodo para listar todos os getores
    @GetMapping
    public ResponseEntity<List<GestorModel>> getAll() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }
    //Metodo para listar um unico gestor
    @GetMapping("{id}")  // listar id unico
    public ResponseEntity<GestorModel> getOne(@PathVariable Integer id) {
        Optional<GestorModel> gestor = repository.findById(id);
        if (gestor.isPresent()) {
            return ResponseEntity.ok(gestor.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public GestorModel saveGestor(@Validated @RequestBody GestorModel gestor) {
        return repository.save(gestor);
    }

    @PutMapping("{id}")
    public ResponseEntity<GestorModel> alterarGestor(@PathVariable(value = "id") Integer id, @Validated @RequestBody GestorModel newGestor){
            Optional<GestorModel> oldGestor = repository.findById(id);
        if (oldGestor.isPresent()){
            GestorModel gestor = oldGestor.get();
            gestor.setNome(newGestor.getNome());
            gestor.setDataNascimento(newGestor.getDataNascimento());
            gestor.setMatricula(newGestor.getMatricula());
            gestor.setSetor(newGestor.getSetor());
            repository.save(gestor);
            return new ResponseEntity<GestorModel>(gestor, HttpStatus.OK);
        }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public void deletarGestor(@PathVariable(value = "id") Integer id){
        Optional<GestorModel> gestor = repository.findById(id);
        if (gestor.isPresent()) {
            repository.deleteById(gestor.get().getId());
        }
    }
}