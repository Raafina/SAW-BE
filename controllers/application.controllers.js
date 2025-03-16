const applicationUseCase = require('../usecases/application.usecases');

exports.getApplications = async (req, res, next) => {
  try {
    // Pastikan req.query selalu memiliki nilai default agar tidak undefined
    const { month, year, page, limit, sort, sortBy, search } = req.query;
    console.log(month, 'month', year, 'year');
    const applications = await applicationUseCase.getApplications({
      month: month ? parseInt(month) : null,
      year: year ? parseInt(year) : null,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort,
      sortBy,
      search,
    });

    res.status(200).json({
      success: true,
      data: applications.data,
      pagination: applications.pagination,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await applicationUseCase.getApplication(id);

    if (!data) {
      return next({
        statusCode: 404,
        status: false,
        message: 'Pendaftar tidak ditemukan',
      });
    } else {
      res.status(200).json({
        message: 'Succes',
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.createApplication = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.updateAppliaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nama_lengkap,
      universitas,
      tipe_magang,
      semester,
      IPK,
      program_studi,
      rencana_mulai,
      rencana_selesai,
      google_drive_link,
      CV_score,
      motivation_letter_score,
    } = req.body;

    const data = await applicationUseCase.updateApplication(id, {
      nama_lengkap,
      universitas,
      tipe_magang,
      semester,
      IPK,
      program_studi,
      rencana_mulai,
      rencana_selesai,
      google_drive_link,
      CV_score,
      motivation_letter_score,
    });

    console.log(data);

    res.status(200).json({
      message: 'Succes',
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await applicationUseCase.deleteApplication(id);

    res.status(200).json({
      message: 'Succes',
      data,
    });
  } catch (error) {
    next(error);
  }
};
