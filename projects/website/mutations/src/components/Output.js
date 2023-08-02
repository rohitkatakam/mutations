import React from 'react';

function decodeNucleotideSequence(sequence) {
    const geneticCode = {
      'TTT': 'Phenylalanine', 'TTC': 'Phenylalanine', 'TTA': 'Leucine', 'TTG': 'Leucine',
      'TCT': 'Serine', 'TCC': 'Serine', 'TCA': 'Serine', 'TCG': 'Serine',
      'TAT': 'Tyrosine', 'TAC': 'Tyrosine', 'TAA': 'Stop', 'TAG': 'Stop',
      'TGT': 'Cysteine', 'TGC': 'Cysteine', 'TGA': 'Stop', 'TGG': 'Tryptophan',
      'CTT': 'Leucine', 'CTC': 'Leucine', 'CTA': 'Leucine', 'CTG': 'Leucine',
      'CCT': 'Proline', 'CCC': 'Proline', 'CCA': 'Proline', 'CCG': 'Proline',
      'CAT': 'Histidine', 'CAC': 'Histidine', 'CAA': 'Glutamine', 'CAG': 'Glutamine',
      'CGT': 'Arginine', 'CGC': 'Arginine', 'CGA': 'Arginine', 'CGG': 'Arginine',
      'ATT': 'Isoleucine', 'ATC': 'Isoleucine', 'ATA': 'Isoleucine', 'ATG': 'Methionine',
      'ACT': 'Threonine', 'ACC': 'Threonine', 'ACA': 'Threonine', 'ACG': 'Threonine',
      'AAT': 'Asparagine', 'AAC': 'Asparagine', 'AAA': 'Lysine', 'AAG': 'Lysine',
      'AGT': 'Serine', 'AGC': 'Serine', 'AGA': 'Arginine', 'AGG': 'Arginine',
      'GTT': 'Valine', 'GTC': 'Valine', 'GTA': 'Valine', 'GTG': 'Valine',
      'GCT': 'Alanine', 'GCC': 'Alanine', 'GCA': 'Alanine', 'GCG': 'Alanine',
      'GAT': 'Aspartic Acid', 'GAC': 'Aspartic Acid', 'GAA': 'Glutamic Acid', 'GAG': 'Glutamic Acid',
      'GGT': 'Glycine', 'GGC': 'Glycine', 'GGA': 'Glycine', 'GGG': 'Glycine',
    };
    
    sequence = sequence.replace(/u/g, "T");
    sequence = sequence.replace(/U/g, "T");
    sequence = sequence.replace(/ /g, "");
    const codonSize = 3;
    let decodedSequence = '';
  
    for (let i = 0; i < sequence.length; i += codonSize) {
      const codon = sequence.slice(i, i + codonSize).toUpperCase();
      const aminoAcid = geneticCode[codon] || 'Unknown'; // Use 'Unknown' for unknown codons
      decodedSequence += aminoAcid + '-';
      if (aminoAcid === 'Stop') {
        break;
      }
    }
    decodedSequence = decodedSequence.slice(0, -1);

    return decodedSequence.trim();
  }
  

function mutation(before, after) {
    //define the amino acid sequences
    let beforeSequence = decodeNucleotideSequence(before);
    let afterSequence = decodeNucleotideSequence(after);

    if (before === after) {
        return "no mutation";
    }

    //this is a frameshift or something
    if (before.length !== after.length) {
        //more to do for insertions and deletions
        let l; 
        let index;
        before.length > after.length ? l = after.length : l = before.length;
        for (let i = 0; i < l; i++) {
            index = i;
            if (before[i] !== after[i]) {
                break;
            }
        }
        return `Frameshift: insertion or deletion at nucleotide ${index + 1}`;
    }
    //now both strings are the same length
    let final = ""
    //silent mutation
    if (beforeSequence === afterSequence) {
        final += "Silent: ";
    }
    //when the sequence changes (either missense or nonsense)
    else {
        //determine nonsense
        let countBefore = 0;
        let countAfter = 0;
        for (let i = 0; i < beforeSequence; i++) {
            if (beforeSequence[i] === '-') {
                countBefore++;
            }
        }
        for (let i = 0; i < afterSequence; i++) {
            if (afterSequence[i] === '-') {
                countAfter++;
            }
        }
        if (countBefore !== countAfter || (afterSequence.slice(-4, -1) === "Sto" && beforeSequence.slice(-4, -1) !== "Sto")) {
            final += "Nonsense. ";
        }
        //if its not nonsense then it has to be missense
        else {
            final += "Missense. ";
        }
    }
    // for (let i = 0; i < before.length; i++) {
    //     if (before[i] !== after[i]) {
    //         final += `${i + 1}, `
    //     }
    // }
    return final;
}

function Output(props) {
    if (props.sub === false) {
        return null;
    }
    return (
        <div className="grid place-items-center">
            <strong className="text-blue-900 text-3xl ">{mutation(props.before, props.after)}</strong>
            <h2 className="text-slate-500 font-semibold text-xl underline decoration-blue-500 decoration-solid decoration-2">Protein before mutation</h2>
            <p className="text-slate-400">{decodeNucleotideSequence(props.before)}</p>
            <h2 className="text-slate-500 font-semibold text-xl underline decoration-blue-500 decoration-solid decoration-2">Protein after mutation</h2>
            <p className="text-slate-400">{decodeNucleotideSequence(props.after)}</p>
        </div>
    );
}

export default Output;