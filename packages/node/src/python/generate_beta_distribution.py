from scipy.special import betaincinv
from scipy.stats import beta as B
import sys

alpha = 3
beta = 3
precision = 1000
denominator = 1e4

result = []

def calculte(randomWord):
    randomWord = randomWord % 1000
    randomWord = randomWord * 1.0 / 1000
    y = betaincinv(alpha, beta, randomWord)
    y_numerator = int(y * denominator)
    y_denominator = int(denominator)
    result.append(y_numerator)
    result.append(y_denominator)
    return result

arg1 = int(sys.argv[1])
result = calculte(arg1)
print(result)