from scipy.special import betaincinv
import numpy as np
from scipy.stats import beta as beta_a

import sys

alpha = 3
beta = 3
precision = 1000
denominator = 1e4

result = []

def calculate(randomWord):
    randomWord = randomWord % 1000
    randomWord = randomWord * 1.0 / 1000
    y = betaincinv(alpha, beta, randomWord)
    y_numerator = int(y * denominator)
    y_denominator = int(denominator)
    result.append(y_numerator)
    result.append(y_denominator)
    return result

beta_params = [(2, 3, 0.9989, 0, 20), 
               (3, 3, 0.001, 90, 110),
               (3, 3, 0.0001,990, 1010)]

def sample_combined_beta_vrf(beta_params, vrf_number):
    """
    vrf_numbers: an array of tuples, where each tuple contains two uint256 numbers.
    """
    weights = [param[2] for param in beta_params]
    weight_cumsum = np.cumsum(weights)

    # Normalize the VRF outputs to [0, 1]
    u1 = vrf_number / (2**256)
    
    # Step 1: Choose which Beta distribution to sample from based on the external random number u1
    dist_idx = np.searchsorted(weight_cumsum, u1)
    
    alpha, beta_param, _, a, b = beta_params[dist_idx]
    
    # Step 2: Perform inverse transform sampling on the chosen Beta distribution using external random number u2
    probability = beta_a.ppf(u1, alpha, beta_param)  

    y_numerator = int(probability * denominator)
    y_denominator = int(denominator)
    result.append(y_numerator)
    result.append(y_denominator)

    return result

def strategyNumber(vrf_number, strategy): 
    if (strategy == 0):
        return calculate(vrf_number)
    else:
        return sample_combined_beta_vrf(beta_params, vrf_number)

arg1 = int(sys.argv[1])
arg2 = int(sys.argv[2])
result = strategyNumber(arg1, arg2)
print(result)
