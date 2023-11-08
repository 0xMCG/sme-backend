from scipy.special import betaincinv
import numpy as np
from scipy.stats import beta as betafuncion

import sys

alpha = 3
beta = 3
precision = 100000
denominator = 1e4

result = []

def calculate(randomWord):
    randomWord = randomWord % precision
    randomWord = randomWord * 1.0 / precision
    y = betaincinv(alpha, beta, randomWord)
    y_numerator = int(y * denominator)
    y_denominator = int(denominator)
    result.append(y_numerator)
    result.append(y_denominator)
    return result

beta_params = [(2, 3, 0.9989, 0, 20), 
               (3, 3, 0.001, 90, 110),
               (3, 3, 0.0001,990, 1010)]

def sample_combined_beta_vrf(beta_params, randomWord):
    """
    vrf_numbers: an array of tuples, where each tuple contains two uint256 numbers.
    """
    weights = [param[2] for param in beta_params]
    weight_cumsum = np.cumsum(weights)

    # Normalize the VRF outputs to [0, 1]
    randomWord = randomWord % precision
    randomWord = randomWord * 1.0 / precision
    
    # Step 1: Choose which Beta distribution to sample from based on the external random number u1
    dist_idx = np.searchsorted(weight_cumsum, randomWord)
    
    alpha, beta_param, _, lower_bound, upper_bound = beta_params[dist_idx]
    
    # Step 2: Perform inverse transform sampling on the chosen Beta distribution using external random number u2
    probability = betafuncion.ppf(randomWord, alpha, beta_param)  

    y_numerator = int((probability * (upper_bound - lower_bound) + lower_bound) * denominator)
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