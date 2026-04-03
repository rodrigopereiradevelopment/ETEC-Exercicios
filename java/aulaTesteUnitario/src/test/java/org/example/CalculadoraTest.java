package org.example;

import org.junit.jupiter.api.Test;
// Importe isso para conseguir validar o resultado:
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculadoraTest {

    Calculadora calc = new Calculadora();

    @Test
    public void testeSoma() {
        // Remova o "a:" e "b:". Passe apenas os números:
        int resultado = calc.somar(2, 3);

        System.out.println("O resultado da soma é: " + resultado);

        // Adicione esta linha para o teste realmente verificar se 2+3 é 5:
        assertEquals(5, resultado);
    }
}
