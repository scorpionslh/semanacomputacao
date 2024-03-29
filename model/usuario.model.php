<?PHP
require_once (dirname(__FILE__) . '/../configs.php');
require_once (dirname(__FILE__) . '/../class/usuario.class.php');

class usuarioModel extends usuario {

	function __construct() {
		parent::__construct();

	}

	protected function salvar() {

		if (empty($this -> nome))
			throw new Exception("Nome em branco");

		if (empty($this -> cpfCnpj))
			throw new Exception("Cfp ou cnpj em branco");

		if (empty($this -> nascimento))
			throw new Exception("Data de nascimento em branco");

		if (empty($this -> matricula))
			throw new Exception("matricula em branco");

		if (empty($this -> idusuario)) {
			$this -> setCriado(date("Y-m-d H:i:s"));
			$this -> setModificado(date("Y-m-d H:i:s"));
			$this -> save();
			return $this -> select($this -> db -> getLastId());
		} else {
			$this -> setModificado(date("Y-m-d H:i:s"));
			return $this -> update();
		}
	}

	public function makeSelectPalestrante($selected = null) {
		$sql = 'select idusuario, nome from usuario where tipoCadastro = \'P\' order by nome';
		$retorno = $this -> db -> executeSelectsSql($sql);
		foreach ((array)$retorno as $key) {
			$msg .= '<option value="' . $key['idusuario'] . '" ';
			if ($key['idusuario'] == $selected) {
				$msg .= 'selected="selected"';
			}
			$msg .= ' >' . $key['nome'] . '</option>';
		}
		return $msg;
	}
	
	public function gridUsuario(&$totalReg, $sortname, $sortorder, $page, $limit, $where = '') {
		if ($page > 0) {
			$page--;
		}
		$inicio = $page * $limit;

		$sql = 'select
                distinct
                      ' . _TABLE_USUARIO_ . '.idusuario,
                      ' . _TABLE_USUARIO_ . '.nome,
                      ' . _TABLE_CURSO_ . '.abreviacao,
                      ' . _TABLE_USUARIO_ . '.matricula,
                      ' . _TABLE_USUARIO_ . '.cpfCnpj,
                      ' . _TABLE_USUARIO_ . '.email,
                      ' . _TABLE_USUARIO_ . '.telefone
                from
                ' . _TABLE_USUARIO_ . '
                left join ' . _TABLE_CURSO_ . ' on ' . _TABLE_USUARIO_ . '.curso_idcurso = ' . _TABLE_CURSO_ . '.idcurso
                where
                	' . _TABLE_USUARIO_ . '.ativo = true
                     ' . $where . '
                Order By ' . $sortname . ' ' . $sortorder;

		$limit = ' LIMIT ' . $inicio . ',' . $limit;
		$lanc = $this -> db -> executeSelectsSql($sql);

		$totalReg = $this -> db -> executeSelectsSql($sql);
		return $lanc;
	}

}
?>