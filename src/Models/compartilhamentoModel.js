module.exports = (sequelize, DataTypes) => {
    const compartilhamento = sequelize.define(
      "compartilhamento",
      {
        diarioNome: {
          type: DataTypes.STRING,
          allowNull: false,
        }, 
        DataRegistro: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ConteudoRegistro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        TipoDeMidia: {
            type: DataTypes.ENUM('Texto', 'Imagem', 'Vídeo', 'Outro'),
            allowNull: true,
        },
        ArquivoDeMidia: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
      },
      { timestamps: true }
    );
    return compartilhamento;
  };