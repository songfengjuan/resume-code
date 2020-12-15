// https://blog.csdn.net/Michaelia_hu/article/details/103390255
package pers.soultree.main;

import java.util.ArrayList;
import java.util.Random;

//int[][] “≤ «“˝”√¥´µ›
public class Sudoku {
	static boolean[][][] placeable = new boolean[9][9][9];// µ⁄º∏∏ˆ ˝◊÷£¨µ⁄º∏π¨£¨µ⁄º∏∫≈Œª÷√
	static int[][] stepPos = new int[9][9];// µ⁄º∏∏ˆ ˝◊÷£¨µ⁄º∏π¨£¨÷µ «Œª÷√
	static Random random = new Random();
	static int resultNum;
	static	long startTime;
	static int[][] answer;
		
	//…˙≥…÷’æ÷£®Œ®“ª£©£¨…˙≥…Ã‚ƒø£®–Ë“™ ‘≥ˆ÷ª”–“ª∏ˆΩ‚µƒÃ‚ƒø£©£¨…˙≥…Ω·π˚£®≥Ã–Ú◊ˆ∏√Ã‚£¨”Î…˙≥…÷’æ÷œ‡Õ¨£©
	public static void main(String[] args) {
		int[][] finalAnswer=generateFinalAnswer();
		int[][] qstGong;
		int[][] qstRow;
		int[][] anwserRow;
		answer=new int[9][9];
		do {
			System.out.println("ÕÍ’˚µƒ ˝∂¿");
			printByGong(finalAnswer);
			qstGong=digholes(finalAnswer,40);	
			System.out.println("≥ˆµƒÃ‚ƒø");
			printByGong(qstGong);
			qstRow = gongConvertToRow(qstGong);
			anwserRow= toBinary(qstRow);
			resultNum=0;
			startTime=System.nanoTime();
			solve(anwserRow);
		}while(resultNum!=1);
	}

	//---------------…˙≥…÷’æ÷---------------------//
	private static int[][] generateFinalAnswer() {
		int[][] result=null;
		do {
			initData();
			result = tryGenerateFinalAnswer();
		} while (result==null);
		return result;
	}

	private static void initData() {
		for (int i = 0; i < 9; i++) {
			for(int j=0;j<9;j++) {
				for(int n=0;n<9;n++) {
					placeable[i][j][n]=true;
				}
			}
		}
		for (int i = 0; i < 9; i++) {
			for (int j = 0; j < 9; j++) {
				stepPos[i][j] = -1;
			}
		}
	}

	//“ª∞„—≠ª∑250∂‡¥ŒæÕƒ‹’“µΩ“ª∏ˆÕÍ’˚µƒ ˝∂¿
	private static int[][] tryGenerateFinalAnswer() {
		int[][] result=new int[9][9];
		for (int number = 0; number < 9; number++) {
			//◊¢“‚’‚¿Ô√ª”–gong++
			for (int gong = 0; gong < 9;) {
				ArrayList<Integer> PlaceableList = getPlaceableList(number, gong);
				int length = PlaceableList.size();
				//ªÿÀ›À„∑®µƒ÷ÿµ„æÕ «’‚¿Ô£¨»Áπ˚µ±«∞“ª≤Ω◊ﬂ≤ªœ¬»•£¨æÕ∑µªÿ…œ“ª≤Ω£¨÷ÿ◊ﬂ
				if (length <= 0) {					
					resetPlaceable(result,number, gong);
					gong--;
					if (gong < 0) {
						number--;
						gong = 8;
					}
					removeNum(result, number, gong);
					
				}else {
					int pos = PlaceableList.get(random.nextInt(length));
					if (isCollide(result,number, gong, pos)) {
						placeable[number][gong][pos] = false;
					}else {
						addNum(result, number, gong, pos);
						gong++;
					}
				}
			}
		}
		return result;
	}
	
	private static ArrayList<Integer> getPlaceableList(int num, int gong) {
		ArrayList<Integer> result = new ArrayList<Integer>();
		for (int pos = 0; pos < 9; pos++) {
			if (placeable[num][gong][pos]) {
				result.add(pos);
			}
		}
		return result;
	}
	
	private static void addNum(int[][] array, int number, int gong, int pos) {
		stepPos[number][gong] = pos;
		array[gong][pos] = number + 1;
		notifyAllNum(gong,pos,false);
	}

	private static void removeNum(int[][] array, int number, int gong) {
		int pos=stepPos[number][gong];
		array[gong][pos] = 0;
		notifyAllNum(gong,pos,true);
		placeable[number][gong][pos] = false;
		stepPos[number][gong]=-1;
	}	

	private static void resetPlaceable(int[][] array,int num, int gong) {
		for (int pos = 0; pos < 9; pos++) {
			if (array[gong][pos] == 0) {
				placeable[num][gong][pos] = true;
			} else {
				placeable[num][gong][pos] = false;
			}
		}
	}

	private static boolean isCollide(int[][]array, int num, int gong, int pos) {
		// ≈–∂œ¡–
		for (int a = gong % 3; a < 9; a = a + 3) {
			for (int b = pos % 3; b < 9; b += 3) {
				if (array[a][b] == (num + 1)) {
					return true;
				}
			}
		}
		// ≈–∂œ––
		for (int a = gong / 3 * 3; a < (gong / 3 + 1) * 3; a++) {
			for (int b = pos / 3 * 3; b < (pos / 3 + 1) * 3; b++) {
				if (array[a][b] == (num + 1)) {
					return true;
				}
			}
		}
		return false;
	}

	private static void notifyAllNum(int gong, int pos,boolean canPlacable) {
		for (int num = 0; num < 9; num++) {
			placeable[num][gong][pos] = canPlacable;
		}
	}
	
	//----------------------------------…˙≥…Ã‚ƒø------------------------------//

	private static int[][] digholes(int[][] finalAnswer) {
		int holesNum=random.nextInt(12)+12;
		return digholes(finalAnswer,holesNum);		
	}

	private static int[][] digholes(int[][] finalAnswer,int holesNum) {
		int[][] result=copyArray(finalAnswer);
		ArrayList<Integer> diggedHoles= new ArrayList<Integer>();
		for(int i = 0;i<holesNum;i++) {
			int pos=random.nextInt(80);
			if(diggedHoles.contains(pos)) {
				i--;
			}else {
				diggedHoles.add(pos);
				result[pos/9][pos%9]=0;
			}
		}
		return result;
	}	

	//------------------------------Ω‚ ˝∂¿---------------------------//
	 private static void solve(int[][] data) {
	    	if(resultNum>1) {
	    		return;
	    	}
	        analyse(data);
	        int result = check(data);
	        if (result == 1) {
	            int[] position = findLessCandidatesPos(data);
	            int pv = data[position[0]][position[1]];
	            int pvcount = Integer.bitCount(pv);
	            for (int i = 0; i < pvcount; i++) {
	                int testV = 1 << ((int) (Math.log(Integer.highestOneBit(pv)) / Math.log(2)));
	                pv ^= testV;
	                int[][] copy = copyArray(data);
	                copy[position[0]][position[1]] = testV;
	                //Œ™ ≤√¥“™∑µªÿƒÿ£ø
	                if(i>1) {
	                	return;
	                }
	                solve(copy);
	            }	        
	        }else if (result == 0) {
	        	resultNum++;
	            System.out.println("------------------------------------µ⁄"+(resultNum)+"∏ˆ¥∞∏---------------------"
	                    + (System.nanoTime() - startTime) / 1000000.0 + "ms---");
	            answer=data;
	    		binaryToInt(answer);
	            printByRow(answer);
	        }
	    }

     //TODO ªπø…“‘º”»Î∆‰À¸…æºı∫Ú—° ˝À„∑®£¨Ω´’‚±‰≥…“ª∏ˆΩ‚Ã‚—›À„∆˜
	    private static void analyse(int[][] data) {
	        boolean changed = false;
	        changed = reduce(data);
	        if (changed) {
	            analyse(data);
	        }
	    }

	    private static boolean reduce(int[][] data) {
	        boolean changed = false;
	        for (int m = 0; m < 9; m++) {
	            for (int n = 0; n < 9; n++) {
	            	//”¶∏√ «≤ªπ‹Õ∆≤‚≥ˆ¿¥µƒ∫Ú—°÷µ”–º∏∏ˆ£¨∂º“™ ”Õº∏¸–¬ ˝∂¿	            	
	                int Candidates=findCandidates(data, m, n);
	                changed=tryReduceCandidates(data, m, n, Candidates);
	            }
	        }
	        return changed;
	    }

	    private static int findCandidates(int[][] data, int m, int n) {
        	//µ± ˝∂¿÷–”–≥¨π˝¡Ω∏ˆ∫Ú—°÷µµƒ ±∫Ú£¨±Ì æ∏√÷µ…–«“≤ª»∑∂®£¨≤≈–Ë“™‘Ÿ∏˘æ›…œœ¬ŒƒÕ∆µº
	        if (Integer.bitCount(data[m][n]) == 1) {
	            return data[m][n];
	        }
	        int row = 0;// ––“—»∑∂®÷µºØ∫œ
	        int col = 0;// ¡–“—»∑∂®÷µºØ∫œ
	        int block = 0; // π¨∏Ò“—»∑∂®÷µºØ∫œ

	        for (int i = 0; i < 9; i++) {
	            if (Integer.bitCount(data[m][i]) == 1) {//’‚ «º∆À„’‚∏ˆ∂˛Ω¯÷∆…œ”–∂‡…Ÿ∏ˆ1£¨»Áπ˚÷ª”–“ª∏ˆ1£¨±Ì æ÷ª”–“ª∏ˆ∫Ú—° ˝£¨‘Ú’‚∏Ò÷ªƒ‹ÃÓ’‚∏ˆ ˝¡À
	                row += data[m][i];//row±Ì æ“ª––…œµƒ÷µ£¨±»»Á110101100±Ì æ’‚“ª––…œ“—æ≠¥Ê‘⁄98643’‚º∏∏ˆ ˝¡À£¨µ´ «‘⁄ƒƒ–©∏Ò◊”…œ≤¢≤ª‘⁄∫ı
	            }
	            if (Integer.bitCount(data[i][n]) == 1) {
	                col += data[i][n];
	            }
	        }
	        for (int i = m / 3 * 3; i < m / 3 * 3 + 3; i++) {
	            for (int j = n / 3 * 3; j < n / 3 * 3 + 3; j++) {
	                if (Integer.bitCount(data[i][j]) == 1) {
	                    block += data[i][j];
	                }
	            }
	        }
	        
	        int existNum = row | col | block;
	        int candidates = 0x1ff ^ existNum;
	        if(candidates==511) {
	        	System.out.println("1");
	        }
	        return candidates;
	    }

	    //data[m][n]¥Ê¥¢µƒ“ª÷± «∫Ú—° ˝◊È≥…µƒ∂˛Ω¯÷∆ ˝£¨µ±√ø∏ˆdata[m][n]÷–¥Ê¥¢µƒ∂˛Ω¯÷∆ ˝÷–÷ª”–“ª∏ˆ1‘Ú±Ì æ’“µΩ¡À¥∞∏
	    private static boolean tryReduceCandidates(int[][] data, int m, int n, int candidates) {
	        int old = data[m][n];
	        data[m][n] = old & candidates;
	        int a= data[m][n];
	        if(a==511) {
	        	System.err.println();
	        }
	        if(candidates==511) {
	        	System.err.println();
	        }
	        if(data[m][n] != old) {
	        	return true;
	        }else {
	        	return false;
	        }
	    }	

	    public static int[] findLessCandidatesPos(int[][] data) {
	        int[] result = null;
	        int smallCount = 10;
	        for (int i = 0; i < 9; i++) {
	            for (int j = 0; j < 9; j++) {
	                int bitcount = Integer.bitCount(data[i][j]);
	                if (bitcount == 2) {
	                    return new int[] { i, j };
	                } else if (bitcount != 1) {
	                    if (smallCount > bitcount) {
	                        smallCount = bitcount;
	                        result = new int[] { i, j };
	                    }
	                }
	            }
	        }
	        return result;
	    }

	    /**
	     * ºÏ≤ÈΩ·π˚
	     * @param data
	     * @return <b>0</b>   ’˝»∑<br>
	     *         <b>1</b>    ªπ”–Œª÷√Œ¥ÃÓ<br>
	     *         <b>-1</b>    ¥ÌŒÛ<br>
	     */
	    private static int check(int[][] data) {
	        for (int i = 0; i < 9; i++) {
	            int row = 0;
	            int col = 0;
	            int block = 0;
	            for (int j = 0; j < 9; j++) {
	                if (Integer.bitCount(data[i][j]) > 1) {
	                    return 1;
	                }
	                row |= data[i][j];//ªÒµ√i––µƒÀ˘”–“—»∑∂®µƒ ˝◊÷
	                col |= data[j][i];//ªÒµ√i¡–µƒÀ˘”–“—»∑∂®µƒ ˝◊÷,—ÿ∂‘Ω«œﬂµƒ∑Ω ΩÕ≥º∆––¡–
	            }

	            for (int h = i / 3 * 3; h < i / 3 * 3 + 3; h++) {
	                for (int l = i % 3 * 3; l < i % 3 * 3 + 3; l++) {
	                    block |= data[h][l];
	                }
	            }
	            if (row != 0x1ff || col != 0x1ff || block != 0x1ff) {
	                return -1;
	            }
	        }
	        return 0;
	    }

	   //-----------------------∆‰À˚------------------------------//
	    private static int[][] toBinary(String source) {
	    	 source = source.replace(" ", "");
	         int[][] data = new int[9][9];
	         for (int i = 0; i < source.length(); i++) {
	        	 int v = source.charAt(i) - '0';
	             if (v != 0) {
	                 data[i / 9][i % 9] = 1 << (v - 1);//’‚¿Ô «œÚ◊Û“∆£¨Ω´1“∆∂Øv-1Œª£¨Ω´ ÆΩ¯÷∆ ˝◊™ªª≥…∂‘”¶Œª÷√…œµƒ1
	             }else {
	            	 data[i / 9][i % 9] = 0x1ff;//0x1ff±Ì æŒ™∂˛Ω¯÷∆ «æ≈∏ˆ1£¨“≤æÕ «111111111,±Ì æ∏√Œª÷√µƒ∫Ú—° ˝Œ™1-9
	             }
	         }
	         return data;
	    }
	    
	    private static int[][] toBinary(int[][] source) {
	         int[][] data = new int[9][9];
	         for (int i = 0; i < 81; i++) {
	             int v = source[i / 9][i % 9];
	             if (v != 0) {
	                 data[i / 9][i % 9] = 1 << (v - 1);
	             }else {
	            	 data[i / 9][i % 9] = 0x1ff;
	             }
	         }
	         return data;
	    }

	    public static int getV9(int v) {
	        //  π”√switch”Î π”√Math.log ±º‰–ß¬ ≤Ó≤ª∂‡
	        switch (v) {
	        case 1:
	            return 1;
	        case 2:
	            return 2;
	        case 4:
	            return 3;
	        case 8:
	            return 4;
	        case 16:
	            return 5;
	        case 32:
	            return 6;
	        case 64:
	            return 7;
	        case 128:
	            return 8;
	        case 256:
	            return 9;
	        default:
	            break;
	        }
	        return -1;
	    }	    
	    
		private static int[][] gongConvertToRow(int[][] array) {
			int[][] result = new int[9][9];
			int i=0,j=0;
			for (int d = 0; d < 9; d += 3) {
				for (int c = 0; c < 9; c += 3) {
					
					for (int a = d / 3 * 3; a < (d / 3 + 1) * 3; a++) {
						for (int b = c / 3 * 3; b < (c / 3 + 1) * 3; b++) {
							result[i][j]=array[a][b];
							j++;
							if(j==9) {
								j=0;
							}
						}
					}
					i++;
				}
			}		
			return result;
		}
		
	    private static int[][] copyArray(int[][] data) {
	        int[][] result = new int[9][9];
	        for (int i = 0; i < 9; i++) {
	            for (int j = 0; j < 9; j++) {
	                result[i][j] = data[i][j];
	            }
	        }
	        return result;
	    }
	    
	    private static void binaryToInt(int[][] binaryData) {
	    	for (int m = 0; m < 9; m++) {
	            for (int n = 0; n < 9; n++) {
	            	binaryData[m][n]= getV9(binaryData[m][n]);	               
	            }
	        }
	    }
	    
		private static void printByGong(int[][] array) {
			for (int d = 0; d < 9; d += 3) {
				for (int c = 0; c < 9; c += 3) {
					
					for (int a = d / 3 * 3; a < (d / 3 + 1) * 3; a++) {
						for (int b = c / 3 * 3; b < (c / 3 + 1) * 3; b++) {
							System.out.print(array[a][b] + " ");
						}
						System.out.print(" | ");
					}					
					System.out.println();
				}
				System.out.println("--------------------------");
			}
		}

	    private static void printByRow(int[][] data) {
	        for (int m = 0; m < 9; m++) {
	            for (int n = 0; n < 9; n++) {
	                if (data[m][n] != -1) {
	                    System.out.print(data[m][n] + " ");
	                } else {
	                    System.out.print("_ ");
	                }
	            }
	            System.out.println();
	        }
	    }
	}
