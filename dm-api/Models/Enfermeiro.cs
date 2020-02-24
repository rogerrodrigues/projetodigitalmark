using System;

public class Enfermeiro {
    
    public Guid Id { get; set; }  
    public String Nome { get; set; }
    public String CPF { get; set; }
    public String COREN { get; set; }
    public DateTime DataNascimento { get; set; }
    public virtual Hospital Hospital { get; set; }
    public Guid  HospitalId { get; set; }

}