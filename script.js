document.getElementById('hitung').addEventListener('click', function() {
    const jenisKelamin = document.getElementById('jenis').value;
    const indikator = document.getElementById('indikator').value;
    const nilai = parseFloat(document.getElementById('nilai').value);
    const bulan = parseInt(document.getElementById('usia').value);
    let resultArea = document.querySelector(".comment");
    // Mencari data berdasarkan jenis kelamin dan usia
    const dataKelamin = data.find(item => item.jenisKelamin === jenisKelamin);
    if (!dataKelamin) {
        document.getElementById('hasil').innerText = 'Data tidak ditemukan untuk jenis kelamin ini.';
        return;
    }

    const dataUsia = dataKelamin.usia.find(item => item.bulan === bulan);
    const nilaiUsia = dataUsia[indikator];
    const z1Usia = dataKelamin.z1.find(item => item.bulan === bulan)[indikator];
    const z0Usia = dataKelamin.z0.find(item => item.bulan === bulan)[indikator];


    // Menghitung z-score
    let zScore = 0;
    
    if (nilai > nilaiUsia) {
        zScore = (nilai - nilaiUsia) / (z1Usia - nilaiUsia);
    } else if (nilai < nilaiUsia) {
        zScore = (nilai - nilaiUsia) / (nilaiUsia - z0Usia);
    } else {
        zScore = 0; // Nilai sama dengan mean
    }
document.getElementById('hasil').innerText = ''; 
    document.getElementById('hasil').innerText += `${zScore.toFixed(2)} \n`;

    // Menambahkan komentar sesuai dengan indikator dan Z-Score
            let comment = '';
            if (indikator === 'bb_u') {
                if (zScore < -3) {
                    comment = 'BBSK (Berat Badan Sangat Kurang)';
                } else if (zScore >= -3 && zScore < -2) {
                    comment = 'BBK (Berat Badan Kurang)';
                } else if (zScore >= -2 && zScore <= 1) {
                    comment = 'Normal';
                } else if (zScore > 1) {
                    comment = 'Resiko BB Lebih';
                }
            } else if (indikator === 'pb_u' || indikator === 'tb_u') {
                if (zScore < -3) {
                    comment = 'Sangat Pendek';
                } else if (zScore >= -3 && zScore < -2) {
                    comment = 'Pendek';
                } else if (zScore >= -2 && zScore <= 3) {
                    comment = 'Normal';
                } else if (zScore > 3) {
                    comment = 'Tinggi';
                }
            } else if (indikator === 'lika_u') {
                if (zScore < -2) {
                    comment = 'Mikrosefalus';
                } else if (zScore >= -2 && zScore <= 2) {
                    comment = 'Normal';
                } else if (zScore > 2) {
                    comment = 'Makrosefalus';
                }
            }

            // Menampilkan comment di bawah hasil Z-Score
            resultArea.innerText = comment;
        });

                                            
