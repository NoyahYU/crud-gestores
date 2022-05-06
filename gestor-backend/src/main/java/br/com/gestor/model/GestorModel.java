package br.com.gestor.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table (name = "tb_gestor")

public class GestorModel {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Integer id;
    @Column (name = "matricula")
    private String matricula;
    @Column (name = "dt_nascimento")
    private LocalDate dataNascimento;
    @Column (name = "nome")
    private String nome;
    @Column (name = "setor")
    private String setor;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }
}