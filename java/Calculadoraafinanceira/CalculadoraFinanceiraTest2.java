import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Testes da Calculadora Financeira - Versão Simplificada")
public class CalculadoraFinanceiraTest2 {

    private CalculadoraFinanceira calc;

    @BeforeEach
    void setup() {
        calc = new CalculadoraFinanceira();
    }

    @Test
    void deveTestarDesconto() {
        assertEquals(90.0, calc.calcularDesconto(100.0, 10.0));
        assertEquals(100.0, calc.calcularDesconto(100.0, 0.0));
        assertThrows(IllegalArgumentException.class, () -> calc.calcularDesconto(-1, 5));
    }

    @Test
    void deveTestarJurosSimples() {
        assertEquals(200.0, calc.calcularJurosSimples(1000.0, 0.1, 2));
        assertThrows(IllegalArgumentException.class, () -> calc.calcularJurosSimples(0, 0.1, 1));
    }

    @Test
    void deveTestarMedia() {
        double[] valores = {10.0, 8.0, 6.0};
        assertEquals(8.0, calc.calcularMedia(valores));
        assertThrows(IllegalArgumentException.class, () -> calc.calcularMedia(null));
        assertThrows(IllegalArgumentException.class, () -> calc.calcularMedia(new double[]{}));
    }

    @Test
    void deveTestarAprovacao() {
        assertTrue(calc.ehAprovado(6.0));
        assertTrue(calc.ehAprovado(10.0));
        assertFalse(calc.ehAprovado(5.9));
    }
}