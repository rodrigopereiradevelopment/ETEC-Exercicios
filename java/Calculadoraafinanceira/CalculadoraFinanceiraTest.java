import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculadoraFinanceiraTest {

    private CalculadoraFinanceira calc;

    @BeforeEach
    void setup() {
        calc = new CalculadoraFinanceira();
    }

    // 1. Testes para calcularDesconto
    @Test
    void deveCalcularDescontoComValorNormal() {
        assertEquals(90.0, calc.calcularDesconto(100.0, 10.0));
    }

    @Test
    void deveCalcularDescontoComPercentualZero() {
        assertEquals(100.0, calc.calcularDesconto(100.0, 0.0));
    }

    @Test
    void deveLancarExcecaoParaDescontoNegativo() {
        assertThrows(IllegalArgumentException.class, () -> calc.calcularDesconto(-10, 5));
    }

    // 2. Testes para calcularJurosSimples
    @Test
    void deveCalcularJurosSimplesCasoValido() {
        assertEquals(200.0, calc.calcularJurosSimples(1000.0, 0.1, 2));
    }

    @Test
    void deveLancarExcecaoParaJurosInvalidos() {
        assertThrows(IllegalArgumentException.class, () -> calc.calcularJurosSimples(0, 0.1, 5));
    }

    // 3. Testes para calcularMedia
    @Test
    void deveCalcularMediaComListaValores() {
        double[] valores = {10.0, 8.0, 6.0};
        assertEquals(8.0, calc.calcularMedia(valores));
    }

    @Test
    void deveLancarExcecaoParaListaVaziaOuNula() {
        assertThrows(IllegalArgumentException.class, () -> calc.calcularMedia(new double[]{}));
        assertThrows(IllegalArgumentException.class, () -> calc.calcularMedia(null));
    }

    // 4. Testes para ehAprovado
    @Test
    void deveValidarNotasParaAprovacao() {
        assertTrue(calc.ehAprovado(7.0));  // Nota maior que 6
        assertTrue(calc.ehAprovado(6.0));  // Nota igual a 6
        assertFalse(calc.ehAprovado(5.9)); // Nota menor que 6
    }
}