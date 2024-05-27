import { IsEnum } from 'class-validator';
import { StatusPedido } from '../../../utils/enums/status-pedido.enum';

export class AtualizaPedidoDto {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}