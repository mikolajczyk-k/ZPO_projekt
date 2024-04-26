package com.nextbank.nextbank;
import org.springframework.stereotype.Service;
import java.util.Random;
import java.math.*;


@Service
public class IBANService {

    public String generateIBAN(String countryCode) {
        String bban = generateBBAN();
        String countryAndBban = countryCode + bban;
        String checkDigits = calculateCheckDigits(countryAndBban);
        return countryCode + checkDigits + bban;
    }

    private String generateBBAN() {
        Random random = new Random();
        String bankCode = String.format("%04d", random.nextInt(10000));
        String accountNumber = String.format("%010d", random.nextInt(1000000000));
        return bankCode + accountNumber;
    }

    private String calculateCheckDigits(String countryAndBban) {
        String tempNumber = countryAndBban + "00"; // Append '00' (placeholder check digits)
        String numericTempNumber = replaceLetters(tempNumber);
        int mod = mod97(numericTempNumber);
        int checkDigits = 98 - mod;
        return String.format("%02d", checkDigits);
    }

    private String replaceLetters(String input) {
        StringBuilder numeric = new StringBuilder();
        for (char c : input.toCharArray()) {
            if (Character.isLetter(c)) {
                numeric.append(c - 'A' + 10);
            } else {
                numeric.append(c);
            }
        }
        return numeric.toString();
    }

    private int mod97(String number) {
        BigInteger modulus = BigInteger.ZERO;
        for (int i = 0; i < number.length(); i += 9) {
            // Take a chunk of up to 9 digits to ensure it's manageable as an integer
            String chunk = number.substring(i, Math.min(i + 9, number.length()));
            // Convert chunk to BigInteger before performing operations
            BigInteger bigChunk = new BigInteger(chunk);
            modulus = bigChunk.add(modulus.multiply(BigInteger.valueOf(1000000000))); // Scale existing modulus and add new chunk
            modulus = modulus.mod(BigInteger.valueOf(97)); // Perform modulo operation
        }
        return modulus.intValue(); // Convert final modulus to integer
    }
}

