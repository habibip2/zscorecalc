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
});
                                            
