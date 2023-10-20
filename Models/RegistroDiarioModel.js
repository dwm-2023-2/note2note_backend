module.exports = (sequelize, DataTypes) => {
    const RegistroDiario = sequelize.define(
       "registro",
    {
        TituloRegistro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ConteudoRegistro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DataRegistro: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        TipoDeMidia: {
            type: DataTypes.ENUM('Imagem', 'Vídeo', 'Áudio', 'Texto'),
            allowNull: true,
        },
        Privacidade: {
            type: DataTypes.ENUM('Público', 'Privado', 'Compartilhado'),
            allowNull: false,
        },
    },
     {timestamps : true}
    );
    return RegistroDiario;
};
