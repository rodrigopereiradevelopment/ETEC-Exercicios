public class CalculadoraFinanceira {

    public double calcularDesconto(double valor, double percentual) {
        if (valor < 0 || percentual < 0) {
            throw new IllegalArgumentException("Valores não podem ser negativos");
        }
        return valor - (valor * percentual / 100);
    }

    public double calcularJurosSimples(double capital, double taxa, int tempo) {
        if (capital <= 0 || taxa <= 0 || tempo <= 0) {
            throw new IllegalArgumentException("Valores devem ser maiores que zero");
        }
        return capital * taxa * tempo;
    }

    public double calcularMedia(double[] valores) {
        if (valores == null || valores.length == 0) {
            throw new IllegalArgumentException("Lista inválida");
        }

        double soma = 0;
        for (double v : valores) {
            soma += v;
        }
        return soma / valores.length;
    }

    public boolean ehAprovado(double nota) {
        return nota >= 6.0;
    }
}