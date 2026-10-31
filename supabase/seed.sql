-- Berkas ini dihasilkan oleh `npm run seed:supabase`.
-- Jangan diedit manual; ubah data di data/keris dan data/kamus.
begin;

insert into public.keris (
  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,
  bagian, makna_filosofis, nilai_budaya, sumber_referensi,
  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada
) values (
  'Keris Bali', 'Keris Bali', 'Bali',
  'Bilah dapat berbentuk lurus atau ber-luk dengan proporsi dan ricikan yang mengikuti tradisi Bali; hulu dan warangka umumnya berukir khas.', null, array['Pamor', 'Ukiran hulu', 'Kinatah']::text[],
  '{"bilah":"Badan keris yang ditempa dari logam, sering diperhatikan bersama kualitas pamor dan ricikannya.","luk":"Lekukan pada bilah; bentuk dan jumlahnya menjadi bagian dari penamaan dhapur.","pamor":"Pola permukaan bilah hasil perpaduan logam. Sebagian keris Bali dikenal memiliki pamor dan hiasan logam mulia.","hulu":"Pegangan berukir dengan motif yang terhubung pada tradisi seni dan keagamaan Bali.","warangka":"Sarung keris yang biasanya diukir dan dapat diberi warna atau hiasan.","mendak":"Cincin logam penghubung antara hulu dan bilah."}'::jsonb,
  'Dalam tradisi Bali, keris memiliki kaitan dengan praktik keagamaan Hindu Bali dan konsep pusaka. Makna dan perlakuan terhadap keris dapat berbeda antar komunitas serta konteks upacara.', 'Keris Bali menjadi bagian dari warisan seni ukir, tempa logam, dan praktik budaya yang masih hidup. Dokumentasi visual dan penjelasan perlu dilakukan dengan hormat.',
  'Edward Frey, The Kris: Mystic Weapon of the Malay World (1988) — halaman perlu dilengkapi; H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi; Museum Bali, catatan koleksi keris — nomor inventaris perlu dilengkapi',
  null,
  'draf', false,
  '', '2026-10-31T00:00:00.000Z'
)
on conflict (kategori) do update set
  nama = excluded.nama,
  asal_daerah = excluded.asal_daerah,
  bentuk_bilah = excluded.bentuk_bilah,
  jumlah_luk = excluded.jumlah_luk,
  ornamen = excluded.ornamen,
  bagian = excluded.bagian,
  makna_filosofis = excluded.makna_filosofis,
  nilai_budaya = excluded.nilai_budaya,
  sumber_referensi = excluded.sumber_referensi,
  gambar_referensi = excluded.gambar_referensi,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar,
  catatan_pakar = excluded.catatan_pakar;

insert into public.keris (
  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,
  bagian, makna_filosofis, nilai_budaya, sumber_referensi,
  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada
) values (
  'Keris Bugis', 'Keris Bugis', 'Sulawesi Selatan — tradisi Bugis',
  'Bilah umumnya lurus atau ber-luk dengan proporsi khas; gaya Bugis dikenal melalui bentuk hulu, warangka, dan ricikan tertentu.', null, array['Pamor', 'Hulu ukir', 'Warangka kayu']::text[],
  '{"bilah":"Badan keris yang ditempa dari logam; bentuk dan ricikannya menjadi ciri yang dipelajari dalam klasifikasi gaya.","luk":"Lekukan pada bilah yang jumlahnya bervariasi.","pamor":"Pola permukaan bilah hasil perpaduan logam saat penempaan.","hulu":"Pegangan keris dengan bentuk ukiran khas; sebagian hulu digambarkan menyerupai burung atau makhluk tertentu.","warangka":"Sarung keris dari kayu, sering berbentuk khas dan dapat dihias.","mendak":"Cincin logam antara hulu dan bilah."}'::jsonb,
  'Dalam tradisi Bugis, keris kerap dikaitkan dengan keberanian, harga diri, dan identitas keluarga. Penjelasan ini merupakan salah satu perspektif tradisional, bukan satu-satunya tafsir.', 'Keris Bugis menjadi bagian dari tradisi seni tempa dan adat masyarakat Sulawesi Selatan, serta menjadi objek kajian budaya dan sejarah.',
  'Edward Frey, The Kris: Mystic Weapon of the Malay World (1988) — halaman perlu dilengkapi; H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi; Museum La Galigo, catatan koleksi — nomor inventaris perlu dilengkapi',
  null,
  'draf', false,
  '', '2026-10-31T00:00:00.000Z'
)
on conflict (kategori) do update set
  nama = excluded.nama,
  asal_daerah = excluded.asal_daerah,
  bentuk_bilah = excluded.bentuk_bilah,
  jumlah_luk = excluded.jumlah_luk,
  ornamen = excluded.ornamen,
  bagian = excluded.bagian,
  makna_filosofis = excluded.makna_filosofis,
  nilai_budaya = excluded.nilai_budaya,
  sumber_referensi = excluded.sumber_referensi,
  gambar_referensi = excluded.gambar_referensi,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar,
  catatan_pakar = excluded.catatan_pakar;

insert into public.keris (
  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,
  bagian, makna_filosofis, nilai_budaya, sumber_referensi,
  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada
) values (
  'Keris Madura', 'Keris Madura', 'Jawa Timur — tradisi Madura',
  'Bilah cenderung tegas dengan proporsi yang khas; bentuk lurus maupun ber-luk dikenal dalam tradisi Madura.', null, array['Pamor', 'Ukiran hulu', 'Warangka']::text[],
  '{"bilah":"Badan keris hasil tempa yang menjadi fokus pengamatan bentuk dan ricikan.","luk":"Lekukan pada bilah; jumlah dan bentuknya bervariasi.","pamor":"Pola permukaan bilah hasil perpaduan logam saat penempaan.","hulu":"Pegangan keris dengan bentuk ukiran yang mengikuti gaya Madura.","warangka":"Sarung keris dari kayu yang dapat berukir dan diberi hiasan.","mendak":"Cincin logam antara hulu dan bilah."}'::jsonb,
  'Dalam tradisi Madura, keris sering dihubungkan dengan keberanian, keteguhan, dan identitas keluarga. Tafsir ini bersifat tradisional dan dapat berbeda antarkomunitas.', 'Madura dikenal memiliki tradisi tempa logam dan perdagangan keris yang panjang; keris menjadi bagian dari warisan budaya dan ekonomi lokal.',
  'Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi; H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi',
  null,
  'draf', false,
  '', '2026-10-31T00:00:00.000Z'
)
on conflict (kategori) do update set
  nama = excluded.nama,
  asal_daerah = excluded.asal_daerah,
  bentuk_bilah = excluded.bentuk_bilah,
  jumlah_luk = excluded.jumlah_luk,
  ornamen = excluded.ornamen,
  bagian = excluded.bagian,
  makna_filosofis = excluded.makna_filosofis,
  nilai_budaya = excluded.nilai_budaya,
  sumber_referensi = excluded.sumber_referensi,
  gambar_referensi = excluded.gambar_referensi,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar,
  catatan_pakar = excluded.catatan_pakar;

insert into public.keris (
  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,
  bagian, makna_filosofis, nilai_budaya, sumber_referensi,
  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada
) values (
  'Keris Majapahit', 'Keris Majapahit', 'Jawa Timur — tradisi Majapahit',
  'Bilah umumnya ramping dengan ricikan yang relatif halus; penilaian gaya (tangguh) Majapahit memerlukan pengamatan langsung oleh ahli.', null, array['Pamor', 'Ricikan bilah', 'Ukiran hulu']::text[],
  '{"bilah":"Badan keris yang ditempa dari logam. Pada gaya Majapahit, perhatian diberikan pada proporsi dan kehalusan ricikan.","luk":"Lekukan pada bilah. Jumlah luk umumnya ganjil, meskipun keris lurus juga lazim.","pamor":"Pola pada permukaan bilah yang terbentuk dari perpaduan logam saat penempaan. Motif pamor perlu diamati langsung untuk dibaca dengan baik.","hulu":"Pegangan keris. Bentuk hulu gaya Jawa dapat menjadi petunjuk tradisi regional, tetapi bukan penentu tunggal.","warangka":"Sarung keris. Bentuk ladrang dan gayaman lazim dalam tradisi Jawa.","mendak":"Cincin logam antara hulu dan bilah yang membantu memperkuat sambungan dan menambah unsur hiasan."}'::jsonb,
  'Dalam perspektif tradisional Jawa, keris sering dimaknai sebagai simbol kewibawaan, tanggung jawab, dan keterhubungan dengan leluhur. Pemaknaan ini bersifat tradisional dan dapat berbeda antar komunitas.', 'Keris Majapahit dipelajari sebagai bagian dari sejarah gaya (tangguh) keris Jawa dan menjadi bahan kajian seni tempa, ikonografi, serta tradisi pusaka.',
  'Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi; H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi; Museum Nasional Indonesia, catatan koleksi keris — nomor inventaris perlu dilengkapi',
  null,
  'draf', false,
  '', '2026-10-31T00:00:00.000Z'
)
on conflict (kategori) do update set
  nama = excluded.nama,
  asal_daerah = excluded.asal_daerah,
  bentuk_bilah = excluded.bentuk_bilah,
  jumlah_luk = excluded.jumlah_luk,
  ornamen = excluded.ornamen,
  bagian = excluded.bagian,
  makna_filosofis = excluded.makna_filosofis,
  nilai_budaya = excluded.nilai_budaya,
  sumber_referensi = excluded.sumber_referensi,
  gambar_referensi = excluded.gambar_referensi,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar,
  catatan_pakar = excluded.catatan_pakar;

insert into public.keris (
  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,
  bagian, makna_filosofis, nilai_budaya, sumber_referensi,
  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada
) values (
  'Keris Minangkabau', 'Keris Minangkabau', 'Sumatera Barat — tradisi Minangkabau',
  'Bilah dapat berbentuk lurus atau ber-luk; gaya Minangkabau memiliki ciri pada bentuk hulu dan sarung yang dipengaruhi tradisi setempat.', null, array['Pamor', 'Ukiran hulu', 'Ukiran warangka']::text[],
  '{"bilah":"Badan keris yang ditempa dari logam dan menjadi objek utama pengamatan bentuk.","luk":"Lekukan pada bilah dengan jumlah yang bervariasi.","pamor":"Pola pada permukaan bilah yang terbentuk dari perpaduan logam.","hulu":"Pegangan keris dengan bentuk dan ukiran yang mengikuti gaya Minangkabau.","warangka":"Sarung keris dari kayu yang dapat berukir.","mendak":"Cincin logam penghubung antara hulu dan bilah."}'::jsonb,
  'Di Minangkabau, keris dapat berperan sebagai pusaka kaum dan penanda identitas adat. Pemaknaan serta aturan pewarisannya dapat berbeda antar kaum dan nagari.', 'Keris Minangkabau berkaitan dengan adat, seni ukir, dan tradisi keluarga. Kajian budaya perlu memperhatikan keragaman praktik lokal.',
  'Edward Frey, The Kris: Mystic Weapon of the Malay World (1988) — halaman perlu dilengkapi; H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi; Museum Adityawarman, catatan koleksi — nomor inventaris perlu dilengkapi',
  null,
  'draf', false,
  '', '2026-10-31T00:00:00.000Z'
)
on conflict (kategori) do update set
  nama = excluded.nama,
  asal_daerah = excluded.asal_daerah,
  bentuk_bilah = excluded.bentuk_bilah,
  jumlah_luk = excluded.jumlah_luk,
  ornamen = excluded.ornamen,
  bagian = excluded.bagian,
  makna_filosofis = excluded.makna_filosofis,
  nilai_budaya = excluded.nilai_budaya,
  sumber_referensi = excluded.sumber_referensi,
  gambar_referensi = excluded.gambar_referensi,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar,
  catatan_pakar = excluded.catatan_pakar;

insert into public.keris (
  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,
  bagian, makna_filosofis, nilai_budaya, sumber_referensi,
  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada
) values (
  'Keris Patani', 'Keris Patani', 'Patani dan kawasan Melayu',
  'Bilah dapat berbentuk lurus atau ber-luk; gaya Melayu Patani dikenal melalui bentuk hulu dan sarung yang khas.', null, array['Pamor', 'Ukiran hulu', 'Warangka kayu']::text[],
  '{"bilah":"Badan keris yang ditempa dari logam dan menjadi objek utama pengamatan bentuk.","luk":"Lekukan pada bilah dengan jumlah yang bervariasi.","pamor":"Pola permukaan bilah hasil perpaduan logam saat penempaan.","hulu":"Pegangan keris dengan bentuk ukiran yang mengikuti gaya Melayu Patani.","warangka":"Sarung keris dari kayu yang dapat diukir dan dihias.","mendak":"Cincin logam antara hulu dan bilah."}'::jsonb,
  'Dalam tradisi Melayu, keris sering dipandang sebagai penanda identitas, keberanian, dan adab. Makna ini dapat berbeda menurut daerah dan konteks sosial.', 'Keris Patani merupakan bagian dari warisan budaya Melayu yang mencakup seni tempa, ukir, dan tradisi pusaka. Penelitian lebih lanjut diperlukan untuk memetakan variasi regionalnya.',
  'Edward Frey, The Kris: Mystic Weapon of the Malay World (1988) — halaman perlu dilengkapi; H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi; Museum Negeri kawasan Melayu, catatan koleksi — lembaga dan nomor inventaris perlu dilengkapi',
  null,
  'draf', false,
  '', '2026-10-31T00:00:00.000Z'
)
on conflict (kategori) do update set
  nama = excluded.nama,
  asal_daerah = excluded.asal_daerah,
  bentuk_bilah = excluded.bentuk_bilah,
  jumlah_luk = excluded.jumlah_luk,
  ornamen = excluded.ornamen,
  bagian = excluded.bagian,
  makna_filosofis = excluded.makna_filosofis,
  nilai_budaya = excluded.nilai_budaya,
  sumber_referensi = excluded.sumber_referensi,
  gambar_referensi = excluded.gambar_referensi,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar,
  catatan_pakar = excluded.catatan_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Keris', 'Senjata tikam tradisional dari Nusantara yang juga berfungsi sebagai pusaka dan simbol budaya.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Bilah', 'Badan keris yang tajam, bagian utama yang ditempa dari logam.', 'bagian',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Luk', 'Lekukan pada bilah keris. Jumlah luk umumnya ganjil, meskipun keris lurus juga lazim.', 'bentuk',
  array['H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Pamor', 'Pola pada permukaan bilah yang muncul dari perpaduan dan pelipatan logam saat penempaan.', 'ornamen',
  array['H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Hulu', 'Gagang atau pegangan keris. Bentuknya dapat menunjukkan gaya regional, tetapi bukan penentu tunggal.', 'bagian',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Warangka', 'Sarung keris, umumnya dibuat dari kayu dan dapat berukir atau diberi hiasan.', 'bagian',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Empu', 'Pengrajin atau pembuat keris yang ahli dalam menempa bilah dan mengolah pamor.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Ornamen', 'Hiasan pada keris, termasuk ukiran dan motif pada hulu, warangka, maupun bilah.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Ganja', 'Bagian bilah di dekat hulu yang menjadi landasan bilah dan tempat sambungan dengan mendak.', 'bagian',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Mendak', 'Cincin logam antara hulu dan bilah yang membantu memperkuat sambungan dan menambah unsur hiasan.', 'bagian',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Ricikan', 'Detail bentuk pada bilah dan bagian keris, misalnya kembang kacang, jenggot, atau lambe gajah.', 'istilah',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Dhapur', 'Nama atau klasifikasi bentuk keris berdasarkan ciri bilah, seperti lurus atau ber-luk, serta ricikannya.', 'bentuk',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Keris Carita', 'Sebutan untuk keris yang bilahnya diukir dengan adegan atau relief cerita. Penamaan dan perinciannya dapat berbeda menurut sumber.', 'jenis',
  array['H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Keris Sajen', 'Sebutan untuk keris berukuran kecil yang dikaitkan dengan keperluan persembahan atau praktik tradisional tertentu. Maknanya perlu dijelaskan sesuai konteks komunitas.', 'jenis',
  array['H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Tangguh', 'Perkiraan gaya atau periode pembuatan keris berdasarkan ciri visual. Penilaiannya memerlukan pengetahuan ahli dan tidak dapat dipastikan hanya dari foto.', 'istilah',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Kembang Kacang', 'Bagian ricikan pada pangkal bilah yang bentuknya menyerupai kacang; detailnya menjadi salah satu ciri dhapur.', 'bagian',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Naga', 'Motif makhluk naga yang dapat muncul pada bilah, hulu, atau warangka sebagai hiasan dan bagian dari ikonografi tradisional.', 'ornamen',
  array['H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Kinatah', 'Hiasan logam mulia, misalnya emas, yang ditempelkan pada bilah atau bagian keris tertentu.', 'ornamen',
  array['H. Bambang Harsrinuksmo, Ensiklopedia Keris (2004) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Pusaka', 'Benda yang diwariskan dan dihormati dalam tradisi keluarga atau komunitas. Makna pusaka dapat berbeda antar daerah.', 'filosofi',
  array['Dokumen proyek Keris AI, Catatan Etika dan Budaya']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Pamor Mlumah', 'Istilah untuk pamor yang tampak membentang pada permukaan bilah; pembacaan motifnya memerlukan pengamatan langsung.', 'ornamen',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Pamor Miring', 'Istilah untuk pamor dengan arah motif miring pada bilah. Penamaan dan pembacaannya dapat berbeda menurut sumber.', 'ornamen',
  array['Haryono Haryoguritno, Keris Jawa: Antara Mistik dan Nalar (2006) — halaman perlu dilengkapi']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Skor Keyakinan (Confidence)', 'Tingkat keyakinan model terhadap prediksinya, biasanya dinyatakan antara 0 dan 1.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Akurasi Top-1', 'Persentase prediksi peringkat pertama yang benar.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Akurasi Top-3', 'Persentase label yang benar berada di tiga peringkat teratas prediksi model.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Pra-pemrosesan', 'Tahap menyiapkan gambar sebelum dianalisis model, misalnya validasi, pengubahan ukuran, dan normalisasi.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Computer Vision', 'Bidang AI yang memungkinkan komputer memahami isi gambar.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'PWA', 'Progressive Web App, aplikasi web yang dapat dipasang seperti aplikasi biasa.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'TWA', 'Trusted Web Activity, cara menampilkan PWA di dalam aplikasi Android tanpa bilah alamat browser.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'APK', 'Paket instalasi aplikasi Android yang dapat langsung dipasang di perangkat.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'AAB', 'Android App Bundle, format unggah aplikasi ke Google Play.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Keystore', 'Berkas kunci untuk menandatangani aplikasi Android. Berkas ini harus disimpan di luar repositori dan dicadangkan.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Digital Asset Links', 'Berkas verifikasi yang menghubungkan domain dengan aplikasi Android, diperlukan agar TWA tampil tanpa bilah alamat.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Capacitor', 'Framework untuk membungkus aplikasi web menjadi aplikasi native dengan akses ke fitur perangkat.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

insert into public.istilah_kamus (
  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar
) values (
  'Append-only', 'Sifat log yang hanya menambah catatan dan tidak mengubah catatan lama.', 'istilah',
  array['Dokumen proyek Keris AI, Glosarium']::text[], 'draf', false
)
on conflict (istilah) do update set
  definisi = excluded.definisi,
  kategori = excluded.kategori,
  sumber = excluded.sumber,
  status_konten = excluded.status_konten,
  verifikasi_pakar = excluded.verifikasi_pakar;

commit;
