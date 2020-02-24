using System;

public class EnfermeiroVM {
    
    public Guid Id { get; set; }  
    public String Nome { get; set; }
    public String CPF { get; set; }
    public String COREN { get; set; }
    public String DataNascimento { get; set; }
    public DateTime DatetimeNascimento { get; set; }
    public Guid  HospitalId { get; set; }

}